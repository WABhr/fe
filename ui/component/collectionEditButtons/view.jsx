// @flow
import * as ICONS from 'constants/icons';
import Button from 'component/button';
import React from 'react';

type Props = {
  collectionIndex?: number,
  collectionUris: Array<Collection>,
  uri: string,
  editCollection: (CollectionEditParams) => void,
};

export default function CollectionButtons(props: Props) {
  const { collectionIndex: foundIndex, collectionUris, uri, editCollection } = props;

  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const lastCollectionIndex = collectionUris ? collectionUris.length - 1 : 0;
  const collectionIndex = Number(foundIndex);

  const orderButton = (className: string, title: string, icon: string, disabled: boolean, handleClick?: () => void) => (
    <Button
      className={`button-collection-manage ${className}`}
      icon={icon}
      title={title}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (handleClick) handleClick();
      }}
    />
  );

  return (
    <div className="collection-preview__edit-buttons">
      <div className="collection-preview__edit-group">
        {orderButton('top-left', __('Move Top'), ICONS.UP_TOP, collectionIndex === 0, () =>
          editCollection({ order: { from: collectionIndex, to: 0 } })
        )}

        {orderButton('bottom-left', __('Move Bottom'), ICONS.DOWN_BOTTOM, collectionIndex === lastCollectionIndex, () =>
          editCollection({ order: { from: collectionIndex, to: lastCollectionIndex } })
        )}
      </div>

      <div className="collection-preview__edit-group">
        {orderButton('', __('Move Up'), ICONS.UP, collectionIndex === 0, () =>
          editCollection({ order: { from: collectionIndex, to: collectionIndex - 1 } })
        )}

        {orderButton('', __('Move Down'), ICONS.DOWN, collectionIndex === lastCollectionIndex, () =>
          editCollection({ order: { from: collectionIndex, to: collectionIndex + 1 } })
        )}
      </div>

      {!confirmDelete ? (
        <div className="collection-preview__edit-group collection-preview__delete ">
          <Button
            className="button-collection-manage button-collection-delete top-right bottom-right"
            icon={ICONS.DELETE}
            title={__('Remove')}
            onClick={() => setConfirmDelete(true)}
          />
        </div>
      ) : (
        <div className="collection-preview__edit-group collection-preview__delete">
          <Button
            className="button-collection-manage button-collection-delete-cancel top-right"
            icon={ICONS.REMOVE}
            title={__('Cancel')}
            onClick={() => setConfirmDelete(false)}
          />

          {orderButton('button-collection-delete-confirm bottom-right', __('Remove'), ICONS.DELETE, false, () =>
            editCollection({ uris: [uri], remove: true })
          )}
        </div>
      )}
    </div>
  );
}
