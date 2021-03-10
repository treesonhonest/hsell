package com.lc.hsell.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A News.
 */
@Entity
@Table(name = "news")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class News implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "content")
    private String content;

    @Column(name = "top")
    private Boolean top;

    @Column(name = "top_time")
    private Instant topTime;

    @Column(name = "create_time")
    private Instant createTime;

    @Column(name = "update_time")
    private Instant updateTime;

    @Column(name = "read_count")
    private Long readCount;

    @OneToMany(mappedBy = "news")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Comments> comments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public News title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public News content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean isTop() {
        return top;
    }

    public News top(Boolean top) {
        this.top = top;
        return this;
    }

    public void setTop(Boolean top) {
        this.top = top;
    }

    public Instant getTopTime() {
        return topTime;
    }

    public News topTime(Instant topTime) {
        this.topTime = topTime;
        return this;
    }

    public void setTopTime(Instant topTime) {
        this.topTime = topTime;
    }

    public Instant getCreateTime() {
        return createTime;
    }

    public News createTime(Instant createTime) {
        this.createTime = createTime;
        return this;
    }

    public void setCreateTime(Instant createTime) {
        this.createTime = createTime;
    }

    public Instant getUpdateTime() {
        return updateTime;
    }

    public News updateTime(Instant updateTime) {
        this.updateTime = updateTime;
        return this;
    }

    public void setUpdateTime(Instant updateTime) {
        this.updateTime = updateTime;
    }

    public Long getReadCount() {
        return readCount;
    }

    public News readCount(Long readCount) {
        this.readCount = readCount;
        return this;
    }

    public void setReadCount(Long readCount) {
        this.readCount = readCount;
    }

    public Set<Comments> getComments() {
        return comments;
    }

    public News comments(Set<Comments> comments) {
        this.comments = comments;
        return this;
    }

    public News addComments(Comments comments) {
        this.comments.add(comments);
        comments.setNews(this);
        return this;
    }

    public News removeComments(Comments comments) {
        this.comments.remove(comments);
        comments.setNews(null);
        return this;
    }

    public void setComments(Set<Comments> comments) {
        this.comments = comments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof News)) {
            return false;
        }
        return id != null && id.equals(((News) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "News{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", top='" + isTop() + "'" +
            ", topTime='" + getTopTime() + "'" +
            ", createTime='" + getCreateTime() + "'" +
            ", updateTime='" + getUpdateTime() + "'" +
            ", readCount=" + getReadCount() +
            "}";
    }
}
