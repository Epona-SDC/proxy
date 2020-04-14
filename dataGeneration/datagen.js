const generatePrice = () => {
  // generate prices of 100-199
  const price = Math.floor(Math.random() * 100) + 100;
  return price;
}

const generateMaxGuests = () => {
  // generate max # of guests from 2-5
  const maxGuests =  Math.floor(Math.random() * 4) + 2;
  return maxGuests;
}

const generateReviews = () => {
  // generate number of reviews from 3-20
  const numReviews = Math.floor(Math.random() * 18) + 3;
  return numReviews;
}

const generateAvgStars = () => {
  // generate average stars from 3.00 - 5.00 (rounded to two decimal places)
  const avgStars = Math.round(((Math.random() * 2) + 3) * 100) / 100;
  return avgStars;
}

const generateFee = () => {
  // generate fees from 50-99
  const fee = Math.floor(Math.random() * 50) + 50;
  return fee;
}

const isDateAvailable = () => {
  if(Math.floor(Math.random() * 2)) {
    return true;
  }
  return false;
}

const getDateForId = (dateId) => {
  // computes and returns date in yyyy/mm/dd for given date id
  const yyyy = '2020';
  let mm;
  let dd;

  if ((dateId < 91) || (dateId > 182)) {
    return 'invalid dateID';
  }
  if (dateId <= 120) {
    mm = '04';
    dd = dateId - 90;
  } else if (dateId <= 151) {
    mm = '05';
    dd = dateId - 120;
  } else {
    mm = '06';
    dd = dateId - 151;
  }
  return `${yyyy}/${mm}/${dd}`
}

const generateRandomDatesList = () => {
  const dateIdStart = 91;
  const dates = [];
  for (let i = 0; i < 91; i += 1) {
    if (isDateAvailable()) {
      let dateId = dateIdStart + i;
      let date = getDateForId(dateId);
      dates.push(date)
    }
  }
  return dates;
}

const generateRental = () => {
  const rental = {};
  // call each above
  // assmble an object
  rental.price = generatePrice();
  rental.maxGuests = generateMaxGuests();
  rental.numReviews = generateReviews();
  rental.avgStars = generateAvgStars();
  rental.cleaningFee = generateFee();
  rental.serviceFee = generateFee();
  rental.occupancyFee = generateFee();
  // return said object
  return rental;
}

const generateNewRentalWithDates = (context, events, done) => {
  const rental = generateRental();

  context.vars['price'] = rental.price;
  context.vars['max_guests'] = rental.maxGuests;

  const reviews = {};
  reviews.numReviews = rental.numReviews;
  reviews.avgStars = rental.avgStars;

  context.vars['reviews'] = reviews;

  const fees = {};
  fees.cleaning_fee = rental.cleaningFee;
  fees.service_fee = rental.serviceFee;
  fees.occupancy_fee = rental.occupancyFee;

  context.vars['fees'] = fees;

  context.vars['availability'] = generateRandomDatesList();

  return done();
}

const randomRentalId = (context, events, done) => {
  // top record from initial 10M run's id is 510,000,000
  // so want a random number between that and 509,000,001
  const highId = Math.floor(Math.random() * 999999) + 509000001;
  context.vars['id'] = highId;
  return done();
}


exports.generateNewRentalWithDates = generateNewRentalWithDates;
exports.randomRentalId = randomRentalId;
