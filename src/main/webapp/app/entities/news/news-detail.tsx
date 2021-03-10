import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './news.reducer';
import { INews } from 'app/shared/model/news.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INewsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NewsDetail = (props: INewsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { newsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="hsellApp.news.detail.title">News</Translate> [<b>{newsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="hsellApp.news.title">Title</Translate>
            </span>
          </dt>
          <dd>{newsEntity.title}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="hsellApp.news.content">Content</Translate>
            </span>
          </dt>
          <dd>{newsEntity.content}</dd>
          <dt>
            <span id="top">
              <Translate contentKey="hsellApp.news.top">Top</Translate>
            </span>
          </dt>
          <dd>{newsEntity.top ? 'true' : 'false'}</dd>
          <dt>
            <span id="topTime">
              <Translate contentKey="hsellApp.news.topTime">Top Time</Translate>
            </span>
          </dt>
          <dd>{newsEntity.topTime ? <TextFormat value={newsEntity.topTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createTime">
              <Translate contentKey="hsellApp.news.createTime">Create Time</Translate>
            </span>
          </dt>
          <dd>{newsEntity.createTime ? <TextFormat value={newsEntity.createTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updateTime">
              <Translate contentKey="hsellApp.news.updateTime">Update Time</Translate>
            </span>
          </dt>
          <dd>{newsEntity.updateTime ? <TextFormat value={newsEntity.updateTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="readCount">
              <Translate contentKey="hsellApp.news.readCount">Read Count</Translate>
            </span>
          </dt>
          <dd>{newsEntity.readCount}</dd>
        </dl>
        <Button tag={Link} to="/news" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/news/${newsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ news }: IRootState) => ({
  newsEntity: news.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
