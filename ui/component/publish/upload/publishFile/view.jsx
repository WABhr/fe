// @flow
import { SITE_NAME, WEB_PUBLISH_SIZE_LIMIT_GB, SIMPLE_SITE } from 'config';
import React, { useState, useEffect } from 'react';
import { regexInvalidURI } from 'util/lbryURI';
import FileSelector from 'component/common/file-selector';
import Button from 'component/button';
import Card from 'component/common/card';
import { FormField } from 'component/common/form';
import Spinner from 'component/spinner';
import * as PUBLISH_MODES from 'constants/publish_types';
import PublishName from 'component/publish/shared/publishName';
import classnames from 'classnames';
import { SOURCE_SELECT } from 'constants/publish_sources';

type Props = {
  uri: ?string,
  mode: ?string,
  name: ?string,
  title: ?string,
  filePath: string | WebFile,
  isStillEditing: boolean,
  balance: number,
  doUpdatePublishForm: ({}) => void,
  disabled: boolean,
  doToast: ({ message: string, isError?: boolean }) => void,
  size: number,
  duration: number,
  isVid: boolean,
  setPublishMode: (string) => void,
  setOverMaxBitrate: (boolean) => void,
  fileSource: string,
  // inEditMode: boolean,
};

function PublishFile(props: Props) {
  const {
    uri,
    mode,
    name,
    title,
    balance,
    filePath,
    isStillEditing,
    doUpdatePublishForm: updatePublishForm,
    doToast,
    disabled,
    size,
    duration,
    isVid,
    setPublishMode,
    // setPrevFileText,
    // setWaitForFile,
    setOverMaxBitrate,
    fileSource,
    // inEditMode,
  } = props;

  const RECOMMENDED_BITRATE = 8500000;
  const MAX_BITRATE = 16500000;
  const TV_PUBLISH_SIZE_LIMIT_BYTES = WEB_PUBLISH_SIZE_LIMIT_GB * 1073741824;
  const TV_PUBLISH_SIZE_LIMIT_GB_STR = String(WEB_PUBLISH_SIZE_LIMIT_GB);

  const MARKDOWN_FILE_EXTENSIONS = ['txt', 'md', 'markdown'];
  const [oversized, setOversized] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [currentFileType, setCurrentFileType] = useState(null);
  const UPLOAD_SIZE_MESSAGE = __('%SITE_NAME% uploads are limited to %limit% GB.', {
    SITE_NAME,
    limit: TV_PUBLISH_SIZE_LIMIT_GB_STR,
  });

  const bitRate = getBitrate(size, duration);
  const bitRateIsOverMax = bitRate > MAX_BITRATE;

  // Reset filePath if publish mode changed
  useEffect(() => {
    if (mode === PUBLISH_MODES.POST) {
      if (currentFileType !== 'text/markdown' && !isStillEditing) {
        updatePublishForm({ filePath: '' });
      }
    } else if (mode === PUBLISH_MODES.LIVESTREAM) {
      updatePublishForm({ filePath: '' });
    }
  }, [currentFileType, mode, isStillEditing, updatePublishForm]);

  useEffect(() => {
    updatePublishForm({ title: title });
  }, [filePath]);

  /*
  const normalizeUrlForProtocol = (url) => {
    if (url.startsWith('https://')) {
      return url;
    } else {
      if (url.startsWith('http://')) {
        return url;
      } else if (url) {
        return `https://${url}`;
      }
    }
  };
  */

  useEffect(() => {
    if (!filePath || filePath === '') {
      setCurrentFile('');
      setOversized(false);
      setOverMaxBitrate(false);
      updateFileInfo(0, 0, false);
    } else if (typeof filePath !== 'string') {
      // Update currentFile file
      if (filePath.name !== currentFile && filePath.path !== currentFile) {
        handleFileChange(filePath);
      }
    }
  }, [filePath, currentFile, doToast, updatePublishForm]);

  useEffect(() => {
    setOverMaxBitrate(bitRateIsOverMax);
  }, [bitRateIsOverMax]);

  function updateFileInfo(duration, size, isvid) {
    updatePublishForm({ fileDur: duration, fileSize: size, fileVid: isvid });
  }

  function getBitrate(size, duration) {
    const s = Number(size);
    const d = Number(duration);
    if (s && d) {
      return (s * 8) / d;
    } else {
      return 0;
    }
  }

  function getUploadMessage() {
    /*
    if(livestreamData){
      return (
        <p className="help--error">
          Livestreams Replay
        </p>
      );
    }
    */
    // @if TARGET='web'
    if (oversized) {
      return (
        <p className="help--error">
          {UPLOAD_SIZE_MESSAGE}{' '}
          <Button button="link" label={__('Upload Guide')} href="https://odysee.com/@OdyseeHelp:b/uploadguide:1" />
        </p>
      );
    }
    // @endif

    if (isVid && duration && bitRate > RECOMMENDED_BITRATE) {
      return (
        <p className="help--warning">
          {bitRateIsOverMax
            ? __(
                'Your video has a bitrate over ~16 Mbps and cannot be processed at this time. We suggest transcoding to provide viewers the best experience.'
              )
            : __(
                'Your video has a bitrate over 8 Mbps. We suggest transcoding to provide viewers the best experience.'
              )}{' '}
          <Button
            button="link"
            label={__('Upload Guide')}
            href="https://odysee.com/@OdyseeHelp:b/uploadguide:1?lc=e280f6e6fdec3f5fd4043954c71add50b3fd2d6a9f3ddba979b459da6ae4a1f4"
          />
        </p>
      );
    }

    if (isVid && !duration) {
      return (
        <p className="help--warning">
          {__(
            'Your video may not be the best format. Use MP4s in H264/AAC format and a friendly bitrate (under 8 Mbps) for more reliable streaming.'
          )}{' '}
          <Button
            button="link"
            label={__('Upload Guide')}
            href="https://odysee.com/@OdyseeHelp:b/uploadguide:1?lc=e280f6e6fdec3f5fd4043954c71add50b3fd2d6a9f3ddba979b459da6ae4a1f4"
          />
        </p>
      );
    }

    if (!!isStillEditing && name) {
      return (
        <p className="help">
          {__("If you don't choose a file, the file from your existing claim %name% will be used", { name: name })}
        </p>
      );
    }
    // @if TARGET='web'
    if (!isStillEditing) {
      return (
        <p className="help">
          {__(
            'For video content, use MP4s in H264/AAC format and a friendly bitrate (under 8 Mbps) for more reliable streaming. %SITE_NAME% uploads are restricted to %limit% GB.',
            { SITE_NAME, limit: TV_PUBLISH_SIZE_LIMIT_GB_STR }
          )}{' '}
          <Button
            button="link"
            label={__('Upload Guide')}
            href="https://odysee.com/@OdyseeHelp:b/uploadguide:1?lc=e280f6e6fdec3f5fd4043954c71add50b3fd2d6a9f3ddba979b459da6ae4a1f4"
          />
        </p>
      );
    }
    // @endif
  }

  function parseName(newName) {
    let INVALID_URI_CHARS = new RegExp(regexInvalidURI, 'gu');
    return newName.replace(INVALID_URI_CHARS, '-');
  }

  function handleTitleChange(event) {
    updatePublishForm({ title: event.target.value });
  }

  function handleFileReaderLoaded(event: ProgressEvent) {
    // See: https://github.com/facebook/flow/issues/3470
    if (event.target instanceof FileReader) {
      const text = event.target.result;
      updatePublishForm({ fileText: text });
      setPublishMode(PUBLISH_MODES.POST);
    }
  }

  function handleFileChange(file: WebFile, clearName = true) {
    window.URL = window.URL || window.webkitURL;
    setOversized(false);
    setOverMaxBitrate(false);

    // $FlowFixMe
    titleInput.current.input.current.focus();

    // select file, start to select a new one, then cancel
    if (!file) {
      if (isStillEditing || !clearName) {
        updatePublishForm({ filePath: '' });
      } else {
        updatePublishForm({ filePath: '', name: '' });
      }
      return;
    }

    // if video, extract duration so we can warn about bitrateif (typeof file !== 'string') {
    const contentType = file.type && file.type.split('/');
    const isVideo = contentType && contentType[0] === 'video';
    const isMp4 = contentType && contentType[1] === 'mp4';

    let isTextPost = false;

    if (contentType && contentType[0] === 'text') {
      isTextPost = contentType[1] === 'plain' || contentType[1] === 'markdown';
      setCurrentFileType(contentType);
    } else if (file.name) {
      // If user's machine is missign a valid content type registration
      // for markdown content: text/markdown, file extension will be used instead
      const extension = file.name.split('.').pop();
      isTextPost = MARKDOWN_FILE_EXTENSIONS.includes(extension);
    }

    if (isVideo) {
      if (isMp4) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          updateFileInfo(video.duration, file.size, isVideo);
          window.URL.revokeObjectURL(video.src);
        };
        video.onerror = () => {
          updateFileInfo(0, file.size, isVideo);
        };
        video.src = window.URL.createObjectURL(file);
      } else {
        updateFileInfo(0, file.size, isVideo);
      }
    } else {
      updateFileInfo(0, file.size, isVideo);
    }

    // Strip off extention and replace invalid characters
    let fileName = name || (file.name && file.name.substr(0, file.name.lastIndexOf('.'))) || '';
    autofillTitle(file);

    if (isTextPost) {
      // Create reader
      const reader = new FileReader();
      // Handler for file reader
      reader.addEventListener('load', handleFileReaderLoaded);
      // Read file contents
      reader.readAsText(file);
      setCurrentFileType('text/markdown');
    } else {
      // setPublishMode(PUBLISH_MODES.FILE);
    }

    // @if TARGET='web'
    // we only need to enforce file sizes on 'web'
    if (file.size && Number(file.size) > TV_PUBLISH_SIZE_LIMIT_BYTES) {
      setOversized(true);
      doToast({ message: __(UPLOAD_SIZE_MESSAGE), isError: true });
      updatePublishForm({ filePath: '' });
      return;
    }
    // @endif

    const publishFormParams: { filePath: string | WebFile, name?: string, optimize?: boolean } = {
      // if electron, we'll set filePath to the path string because SDK is handling publishing.
      // File.path will be undefined from web due to browser security, so it will default to the File Object.
      filePath: file.path || file,
    };

    if (!isStillEditing) {
      publishFormParams.name = parseName(fileName);
    }

    // File path is not supported on web for security reasons so we use the name instead.
    setCurrentFile(file.path || file.name);
    updatePublishForm(publishFormParams);
  }

  function autofillTitle(file) {
    const newTitle = (file && file.name && file.name.substr(0, file.name.lastIndexOf('.'))) || name || '';
    if (!title) updatePublishForm({ title: newTitle });
  }

  const titleInput = React.createRef();

  return (
    <Card
      className={classnames({
        'card--disabled': disabled || balance === 0,
      })}
      actions={
        <>
          <div className="card--file">
            <React.Fragment>
              <>
                <FileSelector
                  disabled={disabled}
                  currentPath={currentFile}
                  onFileChosen={handleFileChange}
                  accept={SIMPLE_SITE ? 'video/mp4,video/x-m4v,video/*,audio/*,image/*' : undefined}
                  placeholder={
                    SIMPLE_SITE ? __('Select video, audio or image file to upload') : __('Select a file to upload')
                  }
                  autoFocus
                />
                {getUploadMessage()}

                {fileSource === SOURCE_SELECT && (
                  <div className="main--empty empty">
                    <Spinner small />
                  </div>
                )}
              </>
              <FormField
                type="text"
                name="content_title"
                label={__('Title')}
                placeholder={__('Descriptive titles work best')}
                disabled={disabled}
                value={title}
                onChange={handleTitleChange}
                className="fieldset-group"
                max="200"
                ref={titleInput}
              />
              <PublishName uri={uri} />
            </React.Fragment>
          </div>
        </>
      }
    />
  );
}

export default PublishFile;