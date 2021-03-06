import React from 'react';
import { connect } from 'react-redux';

import CityBox from './CityBox';
import getCities from '../../../apiCalls/cities/getCities';
import logError from '../../../services/logError';
import pageSpinner from '../../../services/pageSpinner';

class CitiesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cities: []
    }
  }

  componentDidMount() {
    this.loadCities();
  }

  componentDidUpdate(previousProps) {
    if(previousProps.filter !== this.props.filter) {
      this.loadCities()
    }
  }

  getCityBoxes() {
    return this.state.cities.sort(
      (a, b) => a.name.toLowerCase() > b.name.toLowerCase()
    ).map(
      city => (
        <CityBox city={city}
                 key={'city_' + city.country.urlName + '_' + city.urlName} />
      )
    );
  }

  loadCities(withoutFilter) {

    pageSpinner.start('Cities');

    let filter = this.props.filter;
    if(withoutFilter) {
      filter = {
        country: null
      }
    }

    getCities(
      filter.country,
      this.props.translations.language
    ).then(
      cities => cities.sort(function(a, b) {

        if(a.name.toLowerCase() === b.name.toLowerCase()) {
          if(a.country.name.toLowerCase() === b.country.name.toLowerCase()) {
            return 0;
          }

          return a.country.name.toLowerCase() > b.country.name.toLowerCase() ? 1 : -1;
        }

        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      })
    ).then(cities => {
      this.setState({ cities });
      pageSpinner.finish('Cities');
    }).catch(
      error => logError(error, 'components/Cities/src/CitiesList.js')
    );
  }

  render() {
    return (
      <div>
        {this.getCityBoxes()}
      </div>
    );
  }
}

export default connect(
  state => ({ translations: state.translations })
)(CitiesList);