import backgroundImage from '../assets/offer.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  offerCode: {
    background: ' #F89880',
    borderRadius: '60px',
    padding: '5px',
    fontSize: '3rem',
    color:'white'
  },
  discountPercentage: {
    fontSize: '4rem',
    color:'  #F89880',
  },
  val:{
    fontSize: '4rem',
  },
  colortext:{
    color:' #F89880',
  },
}));

const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('https://offercreationapi.onrender.com/offers');
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div>
      {offers.map((offer) => (
        <Card
          key={offer._id}
          style={{
            background: `url(${backgroundImage}) center center / cover no-repeat`,
            position: 'relative',
            marginBottom: '30px',
            width: '100%',
            height: '650px',
            border:'4px #F89880'
          }}
        >
          <CardContent
            style={{
              position: 'absolute',
             margin:'auto',
             marginTop: '6%',
              right: '150px', 
            }}
          >
             <Typography variant="body2" className={classes.offerCode}>
              {offer.offerCode}
            </Typography>
            <Typography variant="h2">{offer.offerTitle}</Typography>
            <Typography variant="h4">{offer.offerDescription}</Typography>
           
           
            {offer.discountPercentage && (
              
               
              <Typography variant="body2" className={classes.discountPercentage}>  GET-  
                 {offer.discountPercentage}% OFF
              </Typography>
            
             
            )}
            <Typography className={classes.colortext} variant="h4"> {offer.applicableOn}</Typography>
            <Typography className={classes.colortext} variant="h4">
              Minimum Order Value ₹{offer.minValue}
            </Typography>
            {offer.maxValue && (
              <Typography className={classes.colortext} variant="h3">
                Maximum Discount ₹{offer.maxValue}
              </Typography>
            )}           
            <Typography className={classes.colortext} variant="h4">
              Valid till {new Date(offer.expiryDate).toLocaleDateString()}
            </Typography>
            {offer.limitedCustomers && (
              <Typography variant="h4">
                Total Customers: {offer.totalCustomers}
              </Typography>
            )}
            {offer.limitedUsage && (
              <Typography variant="h5">
                Usage Per Customer: {offer.usagePerCustomer}
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OfferList;
