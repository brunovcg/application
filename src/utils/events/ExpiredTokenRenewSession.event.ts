import Constants from '../constants/Constants';

const { RENEW_SESSION } = Constants.EVENTS;

abstract class ExpiredTokenRenewSessionEvent {
  static trigger() {
    const event = new Event(RENEW_SESSION);
    document.dispatchEvent(event);
  }
}

export default ExpiredTokenRenewSessionEvent;
