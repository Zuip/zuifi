import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ArticleLayout from '../Layout/Grids/ArticleLayout';
import Articles from '../Articles/Articles';
import BaseLayout from '../Layout/Grids/BaseLayout';
import getArticles from '../../apiCalls/getArticles';
import getCity from '../../apiCalls/cities/getCity';
import getCityTranslations from '../../apiCalls/cities/getCityTranslations';
import pageSpinner from '../../services/pageSpinner';

class City extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articleBlockSize: 5,
      allArticlesLoaded: false,
      city: {
        name: null,
        country: {
          name: null
        }
      }
    };
  }

  componentDidMount() {
    this.loadCity();
    this.loadNextArticles();
  }

  componentDidUpdate(previousProps) {
    if(previousProps.translations.language !== this.props.translations.language) {
      this.loadCityTranslations(
        previousProps.translations.language
      ).then(cityTranslations => {
        cityTranslations.map(
          cityTranslation => {
            if(cityTranslation.language === this.props.translations.language) {
              this.props.history.push(
                '/' + this.props.translations.routes.countries
                + '/' + cityTranslation.country.urlName
                + '/' + this.props.translations.routes.cities
                + '/' + cityTranslation.urlName
              );
            }
          }
        )
      });
    }
  }

  loadCity() {

    pageSpinner.start('City');

    getCity(
      this.props.match.params.countryUrlName,
      this.props.match.params.cityUrlName,
      this.props.translations.language
    ).then(city => {
      this.setState({ city });
      pageSpinner.finish('City');
    }).catch((error) => {
      console.error(error);
    });
  }

  loadCityTranslations(language) {

    pageSpinner.start('City translations');

    return getCityTranslations(
      this.props.match.params.countryUrlName,
      this.props.match.params.cityUrlName,
      language
    ).then(city => {
      pageSpinner.finish('City translations');
      return city;
    }).catch((error) => {
      console.error(error);
    });
  }

  loadNextArticles() {

    pageSpinner.start('City articles');

    getArticles({
      language: this.props.translations.language,
      offset: this.state.articles.length,
      limit: this.state.articleBlockSize,
      cityUrlName: this.props.match.params.cityUrlName,
      countryUrlName: this.props.match.params.countryUrlName
    }).then(articles => {

      if(articles.length !== this.state.articleBlockSize) {
        this.setState({ allArticlesLoaded: true });
      }

      this.setState({
        articles: this.state.articles.concat(articles)
      });

      pageSpinner.finish('City articles');

    }).catch((error) => {
      console.error(error);
    });
  }

  getCountryPath() {
    return '/countries/' + this.state.city.country.urlName;
  }

  render() {
    return (
      <BaseLayout>
        <ArticleLayout>
          <h1>
            {this.state.city.name}
            , <Link to={this.getCountryPath()}>{this.state.city.country.name}</Link>
          </h1>
          <h3>{this.props.translations.articles.latestArticles}</h3>
          <Articles articles={this.state.articles}
                    allArticlesLoaded={this.state.allArticlesLoaded}
                    loadNextArticles={this.loadNextArticles.bind(this)} />
        </ArticleLayout>
      </BaseLayout>
    );
  }
}

export default connect(
  state => ({ translations: state.translations })
)(City);