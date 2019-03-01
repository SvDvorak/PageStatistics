var statistics = angular.module('statistics', []);

function Tag(name) {
    this.name = name;
    this.isCaching = false;
}

statistics.controller('statisticsController', [ "$scope", "$http", function ($scope, $http) {
    $scope.adress = "campexplorer.io";
    $scope.port = 80;
    $scope.serverIsUp = false;

    var CreateAdminOptions = endpoint => { };

    var callAdminService = function(tile, request) {
        return $http(request)
        .then(response => response.data != "" ? JSON.parse(response.data) : "")
        .then(data => tile.body = data)
        .then(() => $scope.serverIsUp = true)
        .catch(() => $scope.serverIsUp = false);
    };

    var adminServiceGet = function(tile, endpoint) {
        return callAdminService(tile, {
            method: "get",
            url: "http://" + $scope.adress + ":" + $scope.port + "/admin/" + endpoint,
        });
    };

    var adminServicePost = function(tile, endpoint, data) {
        var json = JSON.stringify(data);
        return callAdminService(tile, {
            method: "post",
            url: "http://" + $scope.adress + ":" + $scope.port + "/admin/" + endpoint,
            data: json,
            headers: {'Content-Type': 'application/json'}
        });
    };

    var cachedTagsFunc = function() {
        adminServiceGet(this, "tagcount");
    }

    var tagsInQueue = function() {
        adminServiceGet(this, "tagsinqueue");
    }

    var currentlyCaching = function() {
        adminServiceGet(this, "currentlycachingtag");
    }

    var numberOfAlbums = function() {
        adminServiceGet(this, "albumcount");
    }

    var requestRateLastHour = function() {
        adminServicePost(this, "requestrate", { sinceInHours: 1 });
    }

    var requestRateLastDay = function() {
        adminServicePost(this, "requestrate", { sinceInHours: 24 });
    }

    var serverStatus = function() { this.body = $scope.serverIsUp ? "Online and ready =D" : "Server is down =(" };

    $scope.tiles = [
        { header: "Server status", body: "Online and ready =D", update: serverStatus },
        { header: "Cached tags", body: 0, update: cachedTagsFunc },
        { header: "Tags in queue", body: 0, update: tagsInQueue },
        { header: "Currently caching", body: "", update: currentlyCaching },
        { header: "Number of albums", body: "", update: numberOfAlbums },
        { header: "Requests last hour", body: "", update: requestRateLastHour },
        { header: "Requests last 24 hours", body: "", update: requestRateLastDay }];
    
    $scope.tiles.forEach(tile => tile.update());
    $scope.tiles.forEach(tile => setInterval(() => tile.update(), 1000));

  	$scope.addInputTag = function() {
  	    var newTag = $scope.newTag.replace(" ", "-");
  	    $scope.addTag(newTag);
  	    $scope.newTag = null;
        $scope.updateUserSearchCount();
   	};
}]);
