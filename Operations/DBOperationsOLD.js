import SQLite from 'react-native-sqlite-storage';
import {ToastAndroid} from 'react-native';
//const db = {};

// export const createOpenDB = () => {
//   //open the database ready for operations
//   //SQLite.DEBUG(false); //hides annoying errors
//   //SQLite.enablePromise(false);

//   SQLite.DEBUG(true);
//   SQLite.enablePromise(false);

//   db = SQLite.openDatabase(
//     {
//       name: 'Store.db',
//       location: 'default', //'~android/app/src/main/assets/www/Store.db',
//     },
//     () => {
//       console.log('GamePlay DB open exists', 'success');
//     },
//     error => {
//       console.log('GamePlay DB open error', error);
//     },
//   );
// };

export const DBInsert = selectedCity => {
  ToastAndroid.showWithGravity(
    selectedCity + ' has been added to the Database! ',
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );

  var db = SQLite.openDatabase({name: 'Store.db', location: 'default'});
  if (selectedCity.length == 0) {
    ToastAndroid.showWithGravity(
      'Warning! selectedCity is empty',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  } else {
    try {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Users (City) VALUES("${selectedCity}")`, //you must use this structure with executesql not usual sql
          () => {
            ToastAndroid.showWithGravity(
              'Success! ' + selectedCity + ' has been updated to the Database.',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          },
        );
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        'Sad! ' +
          selectedCity +
          ' has not been updated in the database.' +
          error,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  }
};

export const DBSelect = () => {
  // ToastAndroid.showWithGravity(
  //   'DBSelect! ',
  //   ToastAndroid.LONG,
  //   ToastAndroid.CENTER,
  // );

  var db = SQLite.openDatabase({name: 'Store.db', location: 'default'});
  db.transaction(tx => {
    tx.executeSql('SELECT City FROM Users', [], (tx, results) => {
      var data = results;

      // ToastAndroid.showWithGravity(
      //   'DBSelect count of results = ' + data.rows.length,
      //   ToastAndroid.SHORT,
      //   ToastAndroid.CENTER,
      // );

      return data;
      // setCities([]); //empty state
      // for (let i = 0; i < len; i++) {
      //   console.log(
      //     'Operations selectDataHandler results',
      //     results.rows.item(i).City,
      //   );
      //   //get the city
      //   var city = results.rows.item(i).City;
      //   //spread the hook, add in the new city
      //   setCities(cities => {
      //     return [...cities, city];
      //   });
      // }
    });
  });
};

//https://github.com/Chidoge/Chime/blob/3aa990844ef703e6632bbcb34df5105c65a96e9d/src/utility/contactsDatabase.js
// export const insertContactData = selectedCity => {
//   return new Promise((resolve, reject) => {
//     SQLite.openDatabase({name: 'Store.db', location: 1}).then(DB => {
//       DB.executeSql(`INSERT INTO Users (City) VALUES("${selectedCity}")`)
//         .then(() => {
//           console.log('Contact inserted');
//           ToastAndroid.showWithGravity(
//             'City inserted',
//             ToastAndroid.LONG,
//             ToastAndroid.CENTER,
//           );
//           resolve(true);
//         })
//         .catch(e => {
//           console.log('Could not insert contact.');
//           ToastAndroid.showWithGravity(
//             'Could not insert contact.',
//             ToastAndroid.LONG,
//             ToastAndroid.CENTER,
//           );
//           reject(e);
//         });
//     });
//   });
// };
