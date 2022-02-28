// @flow
import { FormField } from 'component/common/form';
import * as MODALS from 'constants/modal_types';
import HOMEPAGE_LANGUAGES from 'constants/homepage_languages';
import Nag from 'component/common/nag';
import React from 'react';
import usePersistedState from 'effects/use-persisted-state';
import { getLanguageEngName, getLanguageName } from 'constants/languages';

const LOCALE_OPTIONS = {
  BOTH: 'both',
  LANG: 'lang',
  HOME: 'home',
};

type Props = {
  localeLangs: Array<string>,
  // redux
  doSetLanguage: (string) => void,
  doSetHomepage: (string) => void,
  doOpenModal: (string, {}) => void,
};

export default function NagLocaleSwitch(props: Props) {
  const { localeLangs, doSetLanguage, doSetHomepage, doOpenModal } = props;

  const [switchOption, setSwitchOption] = React.useState(LOCALE_OPTIONS.BOTH);
  const [localeSwitchDismissed, setLocaleSwitchDismissed] = usePersistedState('locale-switch-dismissed', false);

  const hasHomepageForLang = localeLangs.some((lang) => HOMEPAGE_LANGUAGES[lang]);
  const message = __(
    // If no homepage, only suggest language switch
    !hasHomepageForLang
      ? 'There are language translations available for your location! Do you want to switch from English?'
      : 'A homepage and language translations are available for your location! Do you want to switch?'
  );

  function dismissNag() {
    setLocaleSwitchDismissed(true);
  }

  function handleSwitch() {
    const homepages = [];
    localeLangs.forEach((lang) => HOMEPAGE_LANGUAGES[lang] && homepages.push(lang));

    if (localeLangs.length > 1) {
      doOpenModal(MODALS.CONFIRM, {
        title: __('Choose Your Preference'),
        body: (
          <>
            <LanguageSelect langs={localeLangs} />
            {homepages.length > 1 && <HomepageSelect homepages={homepages} />}
          </>
        ),
        onConfirm: (closeModal) => {
          // $FlowFixMe
          const selection = document.querySelector('.language-switch.checked').id.split(' ')[1];
          doSetLanguage(selection);
          dismissNag();
          closeModal();
        },
      });
    } else {
      const language = localeLangs[0];

      if (switchOption === LOCALE_OPTIONS.BOTH || switchOption === LOCALE_OPTIONS.LANG) {
        doSetLanguage(language);
      }
      if (switchOption === LOCALE_OPTIONS.BOTH || switchOption === LOCALE_OPTIONS.HOME) {
        doSetHomepage(language);
      }

      dismissNag();
    }
  }

  return (
    !localeSwitchDismissed && (
      <Nag
        message={message}
        type="helpful"
        action={
          // Menu field only needed if there is a homepage + language to choose, otherwise
          // there is only 1 option to switch, so use the nag button
          hasHomepageForLang && (
            <FormField
              className="nag__select"
              type="select"
              value={switchOption}
              onChange={(e) => setSwitchOption(e.target.value)}
            >
              <option value={LOCALE_OPTIONS.BOTH}>{__('Both')}</option>
              <option value={LOCALE_OPTIONS.LANG}>{__('Only Language')}</option>
              <option value={LOCALE_OPTIONS.HOME}>{__('Only Homepage')}</option>
            </FormField>
          )
        }
        actionText={__('Switch Now')}
        onClick={handleSwitch}
        onClose={dismissNag}
        closeTitle={__('Dismiss')}
      />
    )
  );
}

type HomepageProps = {
  homepages: Array<string>,
};

const HomepageSelect = (props: HomepageProps) => {
  const { homepages } = props;

  const [selection, setSelection] = React.useState(homepages[0]);

  return (
    <>
      <h1>{__('Homepage')}</h1>

      {homepages.map((homepage) => {
        const language = getLanguageEngName(homepage);
        const languageName = getLanguageName(homepage);
        const label = language === languageName ? language : `${language} (${languageName})`;

        return (
          <FormField
            type="radio"
            className={`homepage-switch ${selection === homepage ? 'checked' : ''}`}
            name={`homepage_switch ${homepage}`}
            key={homepage}
            label={label}
            checked={selection === homepage}
            onChange={() => setSelection(homepage)}
          />
        );
      })}
    </>
  );
};

type LangProps = {
  langs: Array<string>,
};

const LanguageSelect = (props: LangProps) => {
  const { langs } = props;

  const [selection, setSelection] = React.useState(langs[0]);

  return (
    <>
      <h1>{__('Language')}</h1>

      {langs.map((lang) => {
        const language = getLanguageEngName(lang);
        const languageName = getLanguageName(lang);
        const label = language === languageName ? language : `${language} (${languageName})`;

        return (
          <FormField
            type="radio"
            className={`language-switch ${selection === lang ? 'checked' : ''}`}
            name={`language_switch ${lang}`}
            key={lang}
            label={label}
            checked={selection === lang}
            onChange={() => setSelection(lang)}
          />
        );
      })}
    </>
  );
};
