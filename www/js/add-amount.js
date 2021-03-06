myApp.controller("AddAmountCtrl", function(
  $scope,
  Service,
  $state,
  $ionicPlatform,
  $ionicModal,
  $timeout,
  $ionicHistory,
  $window,
  $ionicPopup
) {
  $ionicPlatform.ready(function() {
    screen.orientation.lock("portrait");
  });
  screen.orientation.lock("portrait");
  $scope.withdrawDetails = [];
  //buy Coins
  $scope.buyCoins = function(data) {
    console.log("data buyCoins", data);
    var coinsAdded = data;
    $scope.buyCoinsPromise = Service.buyCoins(data, function(data) {
      // $window.history.back();
      var alertPopup = $ionicPopup.show({
        title: "",
        template: coinsAdded + " coins added Successfully",
        cssClass: "add-withdraw-coins"
      });
      $timeout(function() {
        alertPopup.close();
        $state.go("account");
      }, 800);

      $scope.pageNo = 0;
      $scope.withdrawDetails = [];
      $scope.loadMore();
    });
    $scope.table = "";
  };

  //Initialized maxpage and pageNo
  $scope.pageNo = 0;
  $scope.paging = {
    maxPage: 1
  };
  //getTransactions
  $scope.getTransactionDetails = function() {
    Service.getTransaction($scope.pageNo, function(data) {
      if (data) {
        $scope.paging = data.data.data.options;
        _.each(data.data.data.results, function(n) {
          $scope.withdrawDetails.push(n);
        });
        $scope.loadingDisable = false;
        $scope.$broadcast("scroll.infiniteScrollComplete");
      } else {
      }
    });
  };
  //loadMore
  $scope.loadMore = function() {
    if ($scope.pageNo < $scope.paging.maxPage) {
      $scope.loadingDisable = true;
      $scope.getTransactionDetails();
      $scope.pageNo++;
    } else {
    }
  };
  $scope.loadMore();

  $scope.goBackToPage = function() {
    console.log("Go Back Called");
    $state.go("account");
  };
});
