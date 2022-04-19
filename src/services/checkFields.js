const validateHaeders = (headers, correctHeaders) => {
  headers.forEach((header, i) => {
    if (header.trim().toLowerCase() !== correctHeaders[i].toLowerCase()) {
      throw new Error('incorrect headers!');
    }
  });
};

const checkRequiredFields = data => {
  data.forEach((row, i) => {
    if (i !== data.length) {
      if (!(row[0] && row[1] && row[2])) {
        throw new Error('required field is epty!');
      }
    }
  });
};

const checkDate = date => {
  return /^(0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])[/](19|20)?[0-9]{2}$|^(19|20)?[0-9]{2}[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/.test(
    date,
  );
};

const dateCompare = date => {
  if (checkDate(date)) {
    return new Date() <= new Date(date);
  } else return false;
};

const checkLicNumb = licNumb => {
  return /^[A-Za-z0-9]{6}$/.test(licNumb);
};

const checkName = fullName => {
  return /^[A-Z]{1}[a-z]+[ ][A-Z]{1}[a-z]+$/.test(fullName);
};

const checkPhone = phone => {
  return /^[+][1]\d{10}$|^[1]\d{10}$|^\d{10}$/.test(phone);
};

const checkEmail = email => {
  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
};

const checkDuplicate = (dataArr, row, index) => {
  const duplIndex = dataArr.findIndex((element, idx) => {
    if (index !== idx) {
      if (element[1] === row[1] || element[2] === row[2]) {
        return true;
      }
    }
    return false;
  });

  if (duplIndex === -1) {
    return '';
  }

  return duplIndex + 1;
};

const checkDuplicatePhone = (dataArr, row, index) => {
  const duplIndex = dataArr.findIndex((element, idx) => {
    if (index !== idx) {
      if (element[1] === row[1]) {
        return true;
      }
    }
    return false;
  });

  if (duplIndex === -1) {
    return false;
  }

  return true;
};

const checkDuplicateEmail = (dataArr, row, index) => {
  const duplIndex = dataArr.findIndex((element, idx) => {
    if (index !== idx) {
      if (element[2] === row[2]) {
        return true;
      }
    }
    return false;
  });

  if (duplIndex === -1) {
    return false;
  }

  return true;
};

const checkStates = (states, allStatets) => {
  return states.reduce((acc, state) => {
    state = state.trim();
    if (acc) {
      if (state.length < 2) {
        return false;
      }

      if (state.length === 2) {
        return Object.keys(allStatets).includes(state);
      }

      if (state.length > 2) {
        return Object.values(allStatets).includes(state);
      }
    }

    return acc;
  }, true);
};

const checkFields = {
  validateHaeders,
  checkRequiredFields,
  dateCompare,
  checkLicNumb,
  checkName,
  checkPhone,
  checkEmail,
  checkDuplicate,
  checkDuplicatePhone,
  checkDuplicateEmail,
  checkStates,
};

export default checkFields;
