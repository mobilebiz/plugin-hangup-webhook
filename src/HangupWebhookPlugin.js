import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import axios from 'axios';

const PLUGIN_NAME = 'HangupWebhookPlugin';

export default class HangupWebhookPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    console.log('🐸 🐸 🐸 🐸');
    console.log(`Ver. ${VERSION}`);
    console.log('🐸 🐸 🐸 🐸');
    let taskSid = '';
    const url = process.env.FLEX_APP_WEBHOOK_URL;
    if (VERSION.split('.')[0] === '2') {
      manager.events.addListener('taskWrapup', async (task) => {
        console.log(`🐞🐞🐞 disconnect`);
        taskSid = task.taskSid || '';
        await axios.post(url, { taskSid });
      });
    } else {
      manager.voiceClient.on('disconnect', async (conn) => {
        console.log(`🐞🐞🐞 disconnect`);
        await axios.post(url, { taskSid });
      });

      flex.Actions.addListener('afterAcceptTask', async (payload) => {
        console.log(`🐞🐞🐞 accepted task.`);
        if (payload.task.attributes.direction === 'outbound') {
          taskSid = payload.task.taskSid || '';
        }
      });
    }
  }
}
