// @flow
import { Lbryio } from 'lbryinc';

const isProduction = process.env.NODE_ENV === 'production';

type LogPublishParams = {
  uri: string,
  claim_id: string,
  outpoint: string,
  channel_claim_id?: string,
};

export type ApiLog = {
  setState: (enable: boolean) => void,
  view: (string, string, string, ?number, ?() => void) => Promise<any>,
  search: () => void,
  publish: (ChannelClaim | StreamClaim, successCb?: (claimResult: ChannelClaim | StreamClaim) => void) => void,
};

let gApiLogOn = false;

export const apiLog: ApiLog = {
  setState: (enable: boolean) => {
    gApiLogOn = enable;
  },

  view: (uri, outpoint, claimId, timeToStart) => {
    return new Promise((resolve, reject) => {
      const params: {
        uri: string,
        outpoint: string,
        claim_id: string,
        time_to_start?: number,
      } = {
        uri,
        outpoint,
        claim_id: claimId,
      };

      if (timeToStart && !IS_WEB) {
        params.time_to_start = timeToStart;
      }

      resolve(Lbryio.call('file', 'view', params));
    });
  },

  search: () => {
    if (gApiLogOn && isProduction) {
      Lbryio.call('event', 'search');
    }
  },

  publish: (claimResult: ChannelClaim | StreamClaim, successCb?: (claimResult: ChannelClaim | StreamClaim) => void) => {
    // Don't check if this is production so channels created on localhost are still linked to user
    if (gApiLogOn) {
      const { permanent_url: uri, claim_id: claimId, txid, nout, signing_channel: signingChannel } = claimResult;
      let channelClaimId;
      if (signingChannel) {
        channelClaimId = signingChannel.claim_id;
      }
      const outpoint = `${txid}:${nout}`;
      const params: LogPublishParams = { uri, claim_id: claimId, outpoint };
      if (channelClaimId) {
        params['channel_claim_id'] = channelClaimId;
      }

      Lbryio.call('event', 'publish', params).then(() => {
        if (successCb) successCb(claimResult);
      });
    }
  },
};
