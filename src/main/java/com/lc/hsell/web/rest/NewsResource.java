package com.lc.hsell.web.rest;

import com.lc.hsell.domain.News;
import com.lc.hsell.repository.NewsRepository;
import com.lc.hsell.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.lc.hsell.domain.News}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NewsResource {

    private final Logger log = LoggerFactory.getLogger(NewsResource.class);

    private static final String ENTITY_NAME = "news";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NewsRepository newsRepository;

    public NewsResource(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    /**
     * {@code POST  /news} : Create a new news.
     *
     * @param news the news to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new news, or with status {@code 400 (Bad Request)} if the news has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/news")
    public ResponseEntity<News> createNews(@RequestBody News news) throws URISyntaxException {
        log.debug("REST request to save News : {}", news);
        if (news.getId() != null) {
            throw new BadRequestAlertException("A new news cannot already have an ID", ENTITY_NAME, "idexists");
        }
        News result = newsRepository.save(news);
        return ResponseEntity.created(new URI("/api/news/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /news} : Updates an existing news.
     *
     * @param news the news to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated news,
     * or with status {@code 400 (Bad Request)} if the news is not valid,
     * or with status {@code 500 (Internal Server Error)} if the news couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/news")
    public ResponseEntity<News> updateNews(@RequestBody News news) throws URISyntaxException {
        log.debug("REST request to update News : {}", news);
        if (news.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        News result = newsRepository.save(news);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, news.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /news} : get all the news.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of news in body.
     */
    @GetMapping("/news")
    public List<News> getAllNews() {
        log.debug("REST request to get all News");
        return newsRepository.findAll();
    }

    /**
     * {@code GET  /news/:id} : get the "id" news.
     *
     * @param id the id of the news to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the news, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/news/{id}")
    public ResponseEntity<News> getNews(@PathVariable Long id) {
        log.debug("REST request to get News : {}", id);
        Optional<News> news = newsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(news);
    }

    /**
     * {@code DELETE  /news/:id} : delete the "id" news.
     *
     * @param id the id of the news to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/news/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {
        log.debug("REST request to delete News : {}", id);
        newsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
