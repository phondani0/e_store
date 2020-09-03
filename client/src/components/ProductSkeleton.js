import React from "react";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Skeleton from 'react-loading-skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    width: 250,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: 'auto',
    },
    '&  p': {
      margin: '.8rem 0'
    }
  },

}));

function ProductSkeleton() {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {
        [...Array(10)].map((_, i) => {
          return (
            <Grid key={i} item xs={12} sm={4} lg={3} style={{ marginBottom: '20px' }}>
              <div className={classes.root}>
                <Skeleton height={134} />
                <p>
                  <Skeleton width={120} height={22} />
                </p>
                <p>
                  <Skeleton width={80} height={18} />
                </p>
                <p><Skeleton width={150} height={18} /></p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ marginRight: "20px" }}>
                    <Skeleton width={100} height={28} />
                  </div>
                  <div>
                    <Skeleton width={100} height={28} />
                  </div>
                </div>
              </div>
            </Grid>
          )
        })
      }
    </Grid>
  );
}

export default ProductSkeleton;