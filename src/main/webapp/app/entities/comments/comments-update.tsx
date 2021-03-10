import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { INews } from 'app/shared/model/news.model';
import { getEntities as getNews } from 'app/entities/news/news.reducer';
import { getEntity, updateEntity, createEntity, reset } from './comments.reducer';
import { IComments } from 'app/shared/model/comments.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICommentsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommentsUpdate = (props: ICommentsUpdateProps) => {
  const [newsId, setNewsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { commentsEntity, news, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/comments');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getNews();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createTime = convertDateTimeToServer(values.createTime);
    values.updateTime = convertDateTimeToServer(values.updateTime);

    if (errors.length === 0) {
      const entity = {
        ...commentsEntity,
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
          <h2 id="hsellApp.comments.home.createOrEditLabel">
            <Translate contentKey="hsellApp.comments.home.createOrEditLabel">Create or edit a Comments</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : commentsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="comments-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="comments-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="contentLabel" for="comments-content">
                  <Translate contentKey="hsellApp.comments.content">Content</Translate>
                </Label>
                <AvField id="comments-content" type="text" name="content" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="comments-name">
                  <Translate contentKey="hsellApp.comments.name">Name</Translate>
                </Label>
                <AvField id="comments-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="createTimeLabel" for="comments-createTime">
                  <Translate contentKey="hsellApp.comments.createTime">Create Time</Translate>
                </Label>
                <AvInput
                  id="comments-createTime"
                  type="datetime-local"
                  className="form-control"
                  name="createTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.commentsEntity.createTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updateTimeLabel" for="comments-updateTime">
                  <Translate contentKey="hsellApp.comments.updateTime">Update Time</Translate>
                </Label>
                <AvInput
                  id="comments-updateTime"
                  type="datetime-local"
                  className="form-control"
                  name="updateTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.commentsEntity.updateTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="comments-news">
                  <Translate contentKey="hsellApp.comments.news">News</Translate>
                </Label>
                <AvInput id="comments-news" type="select" className="form-control" name="news.id">
                  <option value="" key="0" />
                  {news
                    ? news.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/comments" replace color="info">
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
  news: storeState.news.entities,
  commentsEntity: storeState.comments.entity,
  loading: storeState.comments.loading,
  updating: storeState.comments.updating,
  updateSuccess: storeState.comments.updateSuccess,
});

const mapDispatchToProps = {
  getNews,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommentsUpdate);
