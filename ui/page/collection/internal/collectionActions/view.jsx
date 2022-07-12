// @flow
import * as ICONS from 'constants/icons';
import React from 'react';
import Button from 'component/button';
import { useIsMobile } from 'effects/use-screensize';
import ClaimSupportButton from 'component/claimSupportButton';
import ClaimShareButton from 'component/claimShareButton';
import FileReactions from 'component/fileReactions';
import classnames from 'classnames';
import { ENABLE_FILE_REACTIONS } from 'config';
import ClaimRepostButton from 'component/claimRepostButton';
import PlayButton from './internal/playButton';
import ShuffleButton from './internal/shuffleButton';
import CollectionDeleteButton from './internal/deleteButton';
import CollectionPublishButton from './internal/publishButton';
import CollectionReportButton from './internal/report-button';

type Props = {
  uri: string,
  claimId?: string,
  isMyCollection: boolean,
  collectionId: string,
  showEdit: boolean,
  setShowEdit: (boolean) => void,
  isBuiltin: boolean,
  collectionEmpty: boolean,
};

function CollectionActions(props: Props) {
  const { uri, claimId, isMyCollection, collectionId, isBuiltin, showEdit, setShowEdit, collectionEmpty } = props;

  const isMobile = useIsMobile();

  return (
    <div className={classnames('media__actions justify-space-between', { stretch: isMobile })}>
      <SectionElement>
        {!collectionEmpty && <PlayButton collectionId={collectionId} />}
        {!collectionEmpty && <ShuffleButton collectionId={collectionId} />}

        {!isBuiltin && (
          <>
            {uri && (
              <>
                {ENABLE_FILE_REACTIONS && <FileReactions uri={uri} />}
                <ClaimSupportButton uri={uri} fileAction />
                <ClaimRepostButton uri={uri} />
                <ClaimShareButton uri={uri} collectionId={collectionId} fileAction webShareable />
              </>
            )}

            {isMyCollection ? (
              <>
                <CollectionPublishButton uri={uri} collectionId={collectionId} />
                <CollectionDeleteButton uri={uri} collectionId={collectionId} />
              </>
            ) : (
              claimId && <CollectionReportButton claimId={claimId} />
            )}
          </>
        )}
      </SectionElement>

      {!collectionEmpty && isMyCollection && (
        <div className="section">
          <Button
            title={__('Arrange')}
            className={classnames('button-toggle', { 'button-toggle--active': showEdit })}
            icon={ICONS.ARRANGE}
            onClick={() => setShowEdit(!showEdit)}
          />
        </div>
      )}
    </div>
  );
}

type SectionProps = {
  children: any,
};

const SectionElement = (props: SectionProps) => {
  const { children } = props;

  const isMobile = useIsMobile();
  return isMobile ? children : <div className="section__actions">{children}</div>;
};

export default CollectionActions;