import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './news.reducer';
import { INews } from 'app/shared/model/news.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INewsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const News = (props: INewsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { newsList, match, loading } = props;
  return (
    <div>
      <h2 id="news-heading">
        <Translate contentKey="hsellApp.news.home.title">News</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="hsellApp.news.home.createLabel">Create new News</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {newsList && newsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.news.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.news.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.news.top">Top</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.news.topTime">Top Time</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.news.createTime">Create Time</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.news.updateTime">Update Time</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.news.readCount">Read Count</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {newsList.map((news, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${news.id}`} color="link" size="sm">
                      {news.id}
                    </Button>
                  </td>
                  <td>{news.title}</td>
                  <td>{news.content}</td>
                  <td>{news.top ? 'true' : 'false'}</td>
                  <td>{news.topTime ? <TextFormat type="date" value={news.topTime} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{news.createTime ? <TextFormat type="date" value={news.createTime} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{news.updateTime ? <TextFormat type="date" value={news.updateTime} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{news.readCount}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${news.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${news.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${news.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="hsellApp.news.home.notFound">No News found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ news }: IRootState) => ({
  newsList: news.entities,
  loading: news.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(News);
