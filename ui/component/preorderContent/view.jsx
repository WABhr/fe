// @flow
import { Form } from 'component/common/form';
import { Lbryio } from 'lbryinc';
import * as PAGES from 'constants/pages';
import Button from 'component/button';
import Card from 'component/common/card';
import React from 'react';

import { getStripeEnvironment } from 'util/stripe';
const stripeEnvironment = getStripeEnvironment();

type TipParams = { tipAmount: number, tipChannelName: string, channelClaimId: string };
type UserParams = { activeChannelName: ?string, activeChannelId: ?string };

type Props = {
  activeChannelId?: string,
  activeChannelName?: string,
  claimId?: string,
  claimType?: string,
  channelClaimId?: string,
  tipChannelName?: string,
  claimIsMine: boolean,
  isSupport: boolean,
  isTipOnly?: boolean,
  customText?: string,
  doHideModal: () => void,
  setAmount?: (number) => void,
  preferredCurrency: string,
  preOrderPurchase: () => void,
  preorderTag: string,
  checkIfAlreadyPurchased: () => void,
};

export default function PreorderContent(props: Props) {
  const {
    activeChannelId,
    activeChannelName,
    claimId,
    channelClaimId,
    tipChannelName,
    doHideModal,
    preOrderPurchase,
    preferredCurrency,
    preorderTag,
    checkIfAlreadyPurchased,
  } = props;

  // set the purchase amount once the preorder tag is selected
  React.useEffect(() => {
    setTipAmount(preorderTag);
  }, [preorderTag]);

  /** STATE **/
  const [tipAmount, setTipAmount] = React.useState();

  const [waitingForBackend, setWaitingForBackend] = React.useState(false);

  const [hasCardSaved, setHasSavedCard] = React.useState(true);

  // check if user has a payment method saved
  React.useEffect(() => {
    if (!stripeEnvironment) return;

    Lbryio.call(
      'customer',
      'status',
      {
        environment: stripeEnvironment,
      },
      'post'
    ).then((customerStatusResponse) => {
      const defaultPaymentMethodId =
        customerStatusResponse.Customer &&
        customerStatusResponse.Customer.invoice_settings &&
        customerStatusResponse.Customer.invoice_settings.default_payment_method &&
        customerStatusResponse.Customer.invoice_settings.default_payment_method.id;

      setHasSavedCard(Boolean(defaultPaymentMethodId));
    });
  }, [setHasSavedCard]);

  // text for modal header
  const titleText = 'Preorder Your Content';

  // icon to use or explainer text to show per tab
  let explainerText = 'This content is not available yet but you' +
    ' can pre-order it now so you can access it as soon as it goes live';

  // when the form button is clicked
  function handleSubmit() {
    const tipParams: TipParams = {
      tipAmount,
      tipChannelName: tipChannelName || '',
      channelClaimId: channelClaimId || '',
    };
    const userParams: UserParams = { activeChannelName, activeChannelId };

    async function checkIfFinished() {
      await checkIfAlreadyPurchased();
      doHideModal();
    }

    setWaitingForBackend(true);

    // hit backend to send tip
    preOrderPurchase(
      tipParams,
      !activeChannelId,
      userParams,
      claimId,
      stripeEnvironment,
      preferredCurrency,
      checkIfFinished,
      doHideModal
    );
  }

  function buildButtonText() {
    return `Preorder your content for $${tipAmount}`;
  }

  return (
    <Form onSubmit={handleSubmit}>
      {!waitingForBackend && <Card
        title={titleText}
        className={'preorder-content-modal'}
        subtitle={
          <>
            {/* short explainer under the button */}
            <div className="section__subtitle">
              {explainerText}
            </div>
          </>
        }
        actions={
          // confirm purchase card
          <>
            {/*  */}
            <div className="section__actions">

              <Button
                autoFocus
                onClick={handleSubmit}
                button="primary"
                // label={__('Confirm')}
                label={buildButtonText()}
                disabled={!hasCardSaved}
              />

              {!hasCardSaved && (<>
                <div className="add-card-prompt">
                  <Button navigate={`/$/${PAGES.SETTINGS_STRIPE_CARD}`} label={__('Add a Card')} button="link" />
                  {' ' + __('To Preorder Content')}
                </div>
              </>)}
            </div>
          </>
        }
      />}
      {/* processing payment card */}
      {waitingForBackend && <Card
        title={titleText}
        className={'preorder-content-modal-loading'}
        subtitle={
          <>
            {/* short explainer under the button */}
            <div className="section__subtitle">
              {'Processing your purchase...'}
            </div>
          </>
        }
      />}
    </Form>
  );
}
