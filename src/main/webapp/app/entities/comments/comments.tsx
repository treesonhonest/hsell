import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './comments.reducer';
import { IComments } from 'app/shared/model/comments.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Comments = (props: ICommentsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { commentsList, match, loading } = props;
  return (
    <div>
      <h2 id="comments-heading">
        <Translate contentKey="hsellApp.comments.home.title">Comments</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="hsellApp.comments.home.createLabel">Create new Comments</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {commentsList && commentsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.comments.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.comments.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.comments.createTime">Create Time</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.comments.updateTime">Update Time</Translate>
                </th>
                <th>
                  <Translate contentKey="hsellApp.comments.news">News</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commentsList.map((comments, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${comments.id}`} color="link" size="sm">
                      {comments.id}
                    </Button>
                  </td>
                  <td>{comments.content}</td>
                  <td>{comments.name}</td>
                  <td>{comments.createTime ? <TextFormat type="date" value={comments.createTime} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{comments.updateTime ? <TextFormat type="date" value={comments.updateTime} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{comments.news ? <Link to={`news/${comments.news.id}`}>{comments.news.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${comments.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${comments.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${comments.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="hsellApp.comments.home.notFound">No Comments found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ comments }: IRootState) => ({
  commentsList: comments.entities,
  loading: comments.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
