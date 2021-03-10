import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comments.reducer';
import { IComments } from 'app/shared/model/comments.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CommentsDetail = (props: ICommentsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { commentsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="hsellApp.comments.detail.title">Comments</Translate> [<b>{commentsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="content">
              <Translate contentKey="hsellApp.comments.content">Content</Translate>
            </span>
          </dt>
          <dd>{commentsEntity.content}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="hsellApp.comments.name">Name</Translate>
            </span>
          </dt>
          <dd>{commentsEntity.name}</dd>
          <dt>
            <span id="createTime">
              <Translate contentKey="hsellApp.comments.createTime">Create Time</Translate>
            </span>
          </dt>
          <dd>
            {commentsEntity.createTime ? <TextFormat value={commentsEntity.createTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updateTime">
              <Translate contentKey="hsellApp.comments.updateTime">Update Time</Translate>
            </span>
          </dt>
          <dd>
            {commentsEntity.updateTime ? <TextFormat value={commentsEntity.updateTime} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="hsellApp.comments.news">News</Translate>
          </dt>
          <dd>{commentsEntity.news ? commentsEntity.news.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/comments" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comments/${commentsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ comments }: IRootState) => ({
  commentsEntity: comments.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CommentsDetail);
