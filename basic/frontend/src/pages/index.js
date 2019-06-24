import React, { Fragment } from 'react';
import { Router } from '@reach/router';
import Cars from './cars';
import Car from './car';
import { PageContainer } from '../components';

export default function Pages() {
  return (
    <Fragment>
      <PageContainer>
        <Router primary={false} component={Fragment}>
          <Cars path="/" />
          <Car path="car/:carId" />
        </Router>
      </PageContainer>
      {/* <Footer /> */}
    </Fragment>
  );
}