import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './news.reducer';
import { INews } from 'app/shared/model/news.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INewsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NewsUpdate = (props: INewsUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { newsEntity, loading, updating } = props;

  const { content } = newsEntity;

  const handleClose = () => {
    props.history.push('/news');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.topTime = convertDateTimeToServer(values.topTime);
    values.createTime = convertDateTimeToServer(values.createTime);
    values.updateTime = convertDateTimeToServer(values.updateTime);

    if (errors.length === 0) {
      const entity = {
        ...newsEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="hsellApp.news.home.createOrEditLabel">
            <Translate contentKey="hsellApp.news.home.createOrEditLabel">Create or edit a News</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : newsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="news-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="news-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="news-title">
                  <Translate contentKey="hsellApp.news.title">Title</Translate>
                </Label>
                <AvField id="news-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="news-content">
                  <Translate contentKey="hsellApp.news.content">Content</Translate>
                </Label>
                <AvInput id="news-content" type="textarea" name="content" />
              </AvGroup>
              <AvGroup check>
                <Label id="topLabel">
                  <AvInput id="news-top" type="checkbox" className="form-check-input" name="top" />
                  <Translate contentKey="hsellApp.news.top">Top</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="topTimeLabel" for="news-topTime">
                  <Translate contentKey="hsellApp.news.topTime">Top Time</Translate>
                </Label>
                <AvInput
                  id="news-topTime"
                  type="datetime-local"
                  className="form-control"
                  name="topTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.newsEntity.topTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createTimeLabel" for="news-createTime">
                  <Translate contentKey="hsellApp.news.createTime">Create Time</Translate>
                </Label>
                <AvInput
                  id="news-createTime"
                  type="datetime-local"
                  className="form-control"
                  name="createTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.newsEntity.createTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updateTimeLabel" for="news-updateTime">
                  <Translate contentKey="hsellApp.news.updateTime">Update Time</Translate>
                </Label>
                <AvInput
                  id="news-updateTime"
                  type="datetime-local"
                  className="form-control"
                  name="updateTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.newsEntity.updateTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="readCountLabel" for="news-readCount">
                  <Translate contentKey="hsellApp.news.readCount">Read Count</Translate>
                </Label>
                <AvField id="news-readCount" type="string" className="form-control" name="readCount" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/news" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  newsEntity: storeState.news.entity,
  loading: storeState.news.loading,
  updating: storeState.news.updating,
  updateSuccess: storeState.news.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NewsUpdate);
