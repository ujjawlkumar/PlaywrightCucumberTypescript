import {
    Before,
    After,
    Status,
    setDefaultTimeout
} from '@cucumber/cucumber';

import { chromium } from '@playwright/test';

import { CustomWorld } from '../utils/world';

import * as fs from 'fs';

setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {

    this.browser = await chromium.launch({
        headless: false
    });

    this.context = await this.browser.newContext({

        recordVideo: {
            dir: 'videos/'
        }
    });

    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario) {

    let videoPath: string | null = null;
    if (this.page.video()) {

        videoPath = await this.page.video()?.path()!;
    }
    if (scenario.result?.status === Status.FAILED) {

        const screenshot = await this.page.screenshot({
            path: `reports/${scenario.pickle.name}.png`,
            type: 'png'
        });

        this.attach(screenshot, 'image/png');
    }

    await this.page.close();

    await this.context.close();

    await this.browser.close();

    // Attach video after browser closes
    if (videoPath) {

        const videoBuffer = await require('fs').readFileSync(videoPath);
        this.attach(videoBuffer, 'video/webm');
    }

});