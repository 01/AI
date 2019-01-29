// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
    ActionTypes,
    Activity,
    CardFactory,
    TurnContext } from 'botbuilder';
import * as i18n from 'i18n';
import { ActivityExtensions } from '../../extensions/activityExtensions';
import {
    DictionaryRenderer,
    LanguageTemplateDictionary,
    TemplateFunction } from '../templateManager/dictionaryRenderer';
import { TemplateManager } from '../templateManager/templateManager';

export class EscalateResponses extends TemplateManager {

    // Fields
    public static RESPONSE_IDS: {
        SendPhoneMessage: string;
    } = {
        SendPhoneMessage:  'sendPhoneMessage'
    };
    private static readonly RESPONSE_TEMPLATES: LanguageTemplateDictionary = new Map([
        ['default', new Map([
            [EscalateResponses.RESPONSE_IDS.SendPhoneMessage, EscalateResponses.fromResources('escalate.phoneInfo')]
        ])]
    ]);

    constructor() {
        super();
        this.register(new DictionaryRenderer(EscalateResponses.RESPONSE_TEMPLATES));
    }

    public static async BUILD_ESCALATE_CARD(turnContext: TurnContext): Promise<Activity> {

        const response: Activity = ActivityExtensions.createReply(turnContext.activity);
        const text: string = i18n.__('escalate.phoneInfo');
        response.attachments = [CardFactory.heroCard(
            text,
            undefined,
            [
                {
                    title: i18n.__('escalate.btnText1'),
                    type: ActionTypes.OpenUrl,
                    value: i18n.__('escalate.btnValue1')
                },
                {
                    title: i18n.__('escalate.btnText2'),
                    type: ActionTypes.OpenUrl,
                    value: i18n.__('escalate.btnValue2')
                }
            ]
        )];

        return Promise.resolve(response);
    }

    private static fromResources(name: string): TemplateFunction {
        return (): Promise<string> => Promise.resolve(i18n.__(name));
    }
}
