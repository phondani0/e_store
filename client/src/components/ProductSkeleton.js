import React from "react";
import { Grid } from '@mui/material';

import Skeleton from 'react-loading-skeleton';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: 250,
//     [theme.breakpoints.down('xl')]: {
//       width: '100%',
//       height: 'auto'
//     },
//     '&  p': {
//       margin: '.8rem 0'
//     }
//   },
//   image: {
//     height: 134,
//     [theme.breakpoints.down('xl')]: {
//       width: '100%',
//       height: '11.5rem'
//     },
//   }

// }));

function ProductSkeleton() {
  // const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {
        [...Array(10)].map((_, i) => {
          return (
            <Grid key={i} item xs={12} sm={4} lg={3} style={{ marginBottom: '20px' }}>
              <div >
                <Skeleton />
                <p>
                  <Skeleton width={120} height={22} />
                </p>
                <p>
                  <Skeleton width={80} height={18} />
                </p>
                <p><Skeleton width={150} height={18} /></p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ marginRight: "20px" }}>
                    <Skeleton width={100} height={25} />
                  </div>
                  <div>
                    <Skeleton width={100} height={25} />
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