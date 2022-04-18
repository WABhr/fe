// @flow
import 'scss/component/_comment-badge.scss';

import * as ICONS from 'constants/icons';
import * as PAGES from 'constants/pages';
import React from 'react';
import CommentBadge from './comment-badge';
import Button from 'component/button';

type Props = {
  membership: ?string,
  linkPage?: boolean,
  placement?: string,
  className?: string,
  hideTooltip?: boolean,
};

export default function PremiumBadge(props: Props) {
  const { membership, linkPage, placement, className, hideTooltip } = props;

  const badgeToShow =
    membership === 'Premium' ? 'silver' : membership === 'Premium+' ? 'gold' : !membership ? null : 'user';

  if (!badgeToShow) return null;

  const badgeProps = { size: 40, placement, hideTooltip, className };

  return (
    <BadgeWrapper linkPage={linkPage}>
      {badgeToShow === 'silver' ? (
        <CommentBadge label="Premium" icon={ICONS.PREMIUM} {...badgeProps} />
      ) : badgeToShow === 'gold' ? (
        badgeToShow === 'gold' && <CommentBadge label="Premium+" icon={ICONS.PREMIUM_PLUS} {...badgeProps} />
      ) : (
        <CommentBadge label="Channel Member" icon={ICONS.MEMBERSHIP} {...badgeProps} />
      )}
    </BadgeWrapper>
  );
}

type WrapperProps = {
  linkPage?: boolean,
  children: any,
};

const BadgeWrapper = (props: WrapperProps) => {
  const { linkPage, children } = props;

  return linkPage ? <Button navigate={`/$/${PAGES.ODYSEE_PREMIUM}`}>{children}</Button> : children;
};
