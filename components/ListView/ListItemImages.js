import React from 'react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletingCompose } from '../../core/actions/composes';

class ListItemImages extends React.Component {

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  // maps to Delete button for FINISHED or FAILED
  handleDelete() {
    this.props.deletingCompose(this.props.listItem.id);
  }

  render() {
    const { listItem } = this.props;
    const timestamp = new Date(listItem.timestamp * 1000);
    const formattedTime = timestamp.toDateString();
    return (
      <div className="list-pf-item">
        <div className="list-pf-container">
          <div className="list-pf-content list-pf-content-flex">
            <div className="list-pf-left">
              <span className="pficon pficon-builder-image list-pf-icon-small" aria-hidden="true" />
            </div>
            <div className="list-pf-content-wrapper">
              <div className="list-pf-main-content">
                <div className="list-pf-title text-overflow-pf">
                  {this.props.blueprint}-ver{listItem.version}-{listItem.compose_type}
                </div>
                <div className="list-pf-description">
                  <FormattedMessage
                    defaultMessage="Based on Version {version}"
                    values={{
                      version: listItem.version
                    }}
                  />
                </div>
              </div>
              <div className="list-pf-additional-content">
                <div className="list-view-pf-additional-info-item list-view-pf-additional-info-item-stacked i18n">
                  <FormattedMessage
                    defaultMessage="Type {type}"
                    values={{
                      type: <strong>{listItem.compose_type}</strong>
                    }}
                  />
                </div>
                <div className="list-view-pf-additional-info-item list-view-pf-additional-info-item-stacked i18n">
                  <FormattedMessage
                    defaultMessage="Date Created {date}"
                    values={{
                      date: <strong>{formattedTime}</strong>
                    }}
                  />
                </div>
              </div>
            </div>
            {listItem.queue_status === 'WAITING' &&
              <div className="list-view-pf-additional-info-item cmpsr-images__status">
                <span className="pficon pficon-pending" aria-hidden="true" />
                <FormattedMessage defaultMessage="Pending" />
              </div>
            } {listItem.queue_status === 'RUNNING' &&
              <div className="list-view-pf-additional-info-item cmpsr-images__status">
                <span className="pficon pficon-in-progress" aria-hidden="true" />
                <FormattedMessage defaultMessage="In Progress" />
              </div>
            } {listItem.queue_status === 'FINISHED' &&
              <div className="list-view-pf-additional-info-item cmpsr-images__status">
                <span className="pficon pficon-ok" aria-hidden="true" />
                <FormattedMessage defaultMessage="Complete" />
              </div>
            } {listItem.queue_status === 'FAILED' &&
              <div className="list-view-pf-additional-info-item cmpsr-images__status">
                <span className="pficon pficon-error-circle-o" aria-hidden="true" />
                <FormattedMessage defaultMessage="Failed" />
              </div>
            }
            <div className="list-pf-actions">
              {listItem.queue_status === 'FINISHED' &&
                <a className="btn btn-default" role="button" download href={this.props.downloadUrl}>
                  <FormattedMessage defaultMessage="Download" />
                </a>
              } {listItem.queue_status === 'FAILED' &&
                <button className="btn btn-default" onClick={this.handleDelete}>
                  <FormattedMessage defaultMessage="Remove" />
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ListItemImages.propTypes = {
  listItem: PropTypes.object,
  blueprint: PropTypes.object,
  deletingCompose: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  deletingCompose: (compose) => {
    dispatch(deletingCompose(compose));
  },
});

export default connect(null, mapDispatchToProps)(ListItemImages);
