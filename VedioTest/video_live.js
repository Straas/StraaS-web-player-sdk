var serverUrl = "http://smart.businessweekly.com.tw/SmartAPI";
var clientid = "2083bcd501de78cd";
var clientsecret = "s-yCkNbukHoxeXDw";

var accountID = "", appToken = "", memberToken = "";
var lives = [], playlists = [], videos = [];

// Straas SDK Player
var Player;
var player;
window.StraaSOnInit = function StraaSOnInit() {
    //console.log('onInit called')
    // Get straas player
    var StraaS = window.StraaS
    Player = StraaS.Player

    getAppToken();
}

function getAppToken() {
    $.getJSON(serverUrl + "/Straas/GetAppToken",
    {
        clientId: clientid,
        clientSecret: clientsecret
    },
    function (data, status, xhr) {
        if (data.msg == "OK") {
            appToken = data.appToken.token;
            accountID = data.appToken.account_id;            
            if (typetxtin == "v") {
                VidepPlay(); //播放影片
            } else {
                LiveReplay(); //播放直播的重播
            }            
        }
        else
            alert(data.msg);
    }
    );
}
function LiveReplay() {		
    var liveId = varliveId;
    $.getJSON(serverUrl + "/Straas/GetLiveDetails",
        {
            id: liveId,
            includes: "category,tags,monetizable_info,videos,sync_status_url_anatomy,owner",
            appToken: appToken
        },
        function (data, status, xhr) {			
            if (data.msg === "OK") {
                var liveDetails = data.liveDetails;
                if (liveDetails.ended_at === null) {
                    // 直播還未結束(包含直播開始前)
                    $("#livePlayers").html("<div id='livePlayer'></div>");
                    player = new Player('#livePlayer', {
                        type: Player.Type.LIVE,
                        id: liveId,
                        accountId: accountID,
                        token: memberToken,
                        playerVars: {
                            loopPlay: Player.LoopPlay.NO,
                            autoPlay: (isautoplay === "y" ? Player.AutoPlay.YES : Player.AutoPlay.NO),
                            playlistMenu: Player.PlaylistMenu.NO,
                            showViewsCount: isshowViewsCount
                        },
                        events: {                           
                            onError: function (event) {                                
                            },
                            loadstart: function (event) {                                
                            }
                        }
                    });
                } else {					
                    if (liveDetails.videos.length > 0) {
                        var divPlayer = "";
						var divPlayerPages = "";
                        for (var i = 0; i < liveDetails.videos.length; i++) {
							if (i == 0)
							{
								divPlayer += "<div id='player" + i + "' ></div>";
							} else{
								divPlayer += "<div id='player" + i + "' style='display:none;' ></div>";
							}                            
                        }
						
						divPlayerPages += "<ul class='detail-player-list'>";
						for (var i = 0; i < liveDetails.videos.length; i++) {
							divPlayerPages += "<li><a href='javascript:void();' onclick='getAppToken2(" + parseInt(i) + ");' style='cursor:pointer;' >" + parseInt(i + 1) + "</a></li>";									                       
                        }
						divPlayerPages += "</ul>";

                        $("#livePlayers").html(divPlayer);
						$("#livepages").html(divPlayerPages);
						
                        if (liveDetails.videos.length > 1) {
                            // 分段的影片，依照時間先後排序
                            for (i = 0; i < liveDetails.videos.length; i++) {
                                for (var j = i + 1; j < liveDetails.videos.length; j++) {
                                    if (liveDetails.videos[i].live_started_at > liveDetails.videos[j].live_started_at) {
                                        var temp = liveDetails.videos[i];
                                        liveDetails.videos[i] = liveDetails.videos[j];
                                        liveDetails.videos[j] = temp;
                                    }
                                }
                            }
                        }
						
                        // 依照直播影片段數，產生數個 Player
						var Players = [];
                        var readyCount = 0;
                        for (i = 0; i < liveDetails.videos.length; i++) {
							var all = liveDetails.videos.length - 1 ;							
							if (i == 0)
							{							
								player = new Player('#player' + i, {
                                type: Player.Type.VIDEO,
                                id: liveDetails.videos[i].id,
                                accountId: accountID,
                                token: memberToken,
                                playerVars: {
                                    loopPlay: Player.LoopPlay.NO,
                                    autoPlay: (isautoplay === "y" ? Player.AutoPlay.YES : Player.AutoPlay.NO),
                                    playlistMenu: Player.PlaylistMenu.NO,
                                    showViewsCount: isshowViewsCount
                                },
                                events: {
                                    loadeddata: function () {
                                        readyCount++;
                                        if (readyCount === liveDetails.videos.length) {											
										}											
                                    },
									ended: function ended(event) { 	
										getAppToken2("1");
									},
                                    onError: function onError(event) {                                      
										
                                    }
                                }
								});
							} else if (i == all) {								
								player = new Player('#player' + i, {
                                type: Player.Type.VIDEO,
                                id: liveDetails.videos[i].id,
                                accountId: accountID,
                                token: memberToken,
                                playerVars: {
                                    loopPlay: Player.LoopPlay.NO,
                                    autoPlay: Player.PlaylistMenu.NO,
                                    playlistMenu: Player.PlaylistMenu.NO,
                                    showViewsCount: isshowViewsCount
                                },
                                events: {
                                    loadeddata: function () {
                                        readyCount++;
                                        if (readyCount === liveDetails.videos.length) {											
										}											
                                    },
									ended: function ended(event) {										
									},
                                    onError: function onError(event) {                                      
										
                                    }
                                }
								});			

							} else if (i == 1) {
								player = new Player('#player' + i, {
                                type: Player.Type.VIDEO,
                                id: liveDetails.videos[i].id,
                                accountId: accountID,
                                token: memberToken,
                                playerVars: {
                                    loopPlay: Player.LoopPlay.NO,
                                    autoPlay: Player.PlaylistMenu.NO,
                                    playlistMenu: Player.PlaylistMenu.NO,
                                    showViewsCount: isshowViewsCount
                                },
                                events: {
                                    loadeddata: function () {
                                        readyCount++;
                                        if (readyCount === liveDetails.videos.length) {											
										}											
                                    },
									ended: function ended(event) { 	
										getAppToken2("2");
									},
                                    onError: function onError(event) {                                      
										
                                    }
                                }
								});						
							
							} else if (i == 2) {
								player = new Player('#player' + i, {
                                type: Player.Type.VIDEO,
                                id: liveDetails.videos[i].id,
                                accountId: accountID,
                                token: memberToken,
                                playerVars: {
                                    loopPlay: Player.LoopPlay.NO,
                                    autoPlay: Player.PlaylistMenu.NO,
                                    playlistMenu: Player.PlaylistMenu.NO,
                                    showViewsCount: isshowViewsCount
                                },
                                events: {
                                    loadeddata: function () {
                                        readyCount++;
                                        if (readyCount === liveDetails.videos.length) {											
										}											
                                    },
									ended: function ended(event) { 	
										getAppToken2("3");
									},
                                    onError: function onError(event) {                                      
										
                                    }
                                }
								});						
							
							} else if (i == 3) {
								player = new Player('#player' + i, {
                                type: Player.Type.VIDEO,
                                id: liveDetails.videos[i].id,
                                accountId: accountID,
                                token: memberToken,
                                playerVars: {
                                    loopPlay: Player.LoopPlay.NO,
                                    autoPlay: Player.PlaylistMenu.NO,
                                    playlistMenu: Player.PlaylistMenu.NO,
                                    showViewsCount: isshowViewsCount
                                },
                                events: {
                                    loadeddata: function () {
                                        readyCount++;
                                        if (readyCount === liveDetails.videos.length) {											
										}											
                                    },
									ended: function ended(event) { 	
										getAppToken2("4");
									},
                                    onError: function onError(event) {                                      
										
                                    }
                                }
								});						
							
							} else if (i == 4) {
								player = new Player('#player' + i, {
                                type: Player.Type.VIDEO,
                                id: liveDetails.videos[i].id,
                                accountId: accountID,
                                token: memberToken,
                                playerVars: {
                                    loopPlay: Player.LoopPlay.NO,
                                    autoPlay: Player.PlaylistMenu.NO,
                                    playlistMenu: Player.PlaylistMenu.NO,
                                    showViewsCount: isshowViewsCount
                                },
                                events: {
                                    loadeddata: function () {
                                        readyCount++;
                                        if (readyCount === liveDetails.videos.length) {											
										}											
                                    },
									ended: function ended(event) { 	
										getAppToken2("5");
									},
                                    onError: function onError(event) {                                      
										
                                    }
                                }
								});						
							
							} else if (i == 5) {
								player = new Player('#player' + i, {
                                type: Player.Type.VIDEO,
                                id: liveDetails.videos[i].id,
                                accountId: accountID,
                                token: memberToken,
                                playerVars: {
                                    loopPlay: Player.LoopPlay.NO,
                                    autoPlay: Player.PlaylistMenu.NO,
                                    playlistMenu: Player.PlaylistMenu.NO,
                                    showViewsCount: isshowViewsCount
                                },
                                events: {
                                    loadeddata: function () {
                                        readyCount++;
                                        if (readyCount === liveDetails.videos.length) {											
										}											
                                    },
									ended: function ended(event) { 	
										getAppToken2("6");
									},
                                    onError: function onError(event) {                                      
										
                                    }
                                }
								});						

							} else if (i == 6) {
								player = new Player('#player' + i, {
                                type: Player.Type.VIDEO,
                                id: liveDetails.videos[i].id,
                                accountId: accountID,
                                token: memberToken,
                                playerVars: {
                                    loopPlay: Player.LoopPlay.NO,
                                    autoPlay: Player.PlaylistMenu.NO,
                                    playlistMenu: Player.PlaylistMenu.NO,
                                    showViewsCount: isshowViewsCount
                                },
                                events: {
                                    loadeddata: function () {
                                        readyCount++;
                                        if (readyCount === liveDetails.videos.length) {											
										}											
                                    },
									ended: function ended(event) { 	
										getAppToken2("7");
									},
                                    onError: function onError(event) {                                      
										
                                    }
                                }
								});						

							} else if (i == 7) {
								player = new Player('#player' + i, {
                                type: Player.Type.VIDEO,
                                id: liveDetails.videos[i].id,
                                accountId: accountID,
                                token: memberToken,
                                playerVars: {
                                    loopPlay: Player.LoopPlay.NO,
                                    autoPlay: Player.PlaylistMenu.NO,
                                    playlistMenu: Player.PlaylistMenu.NO,
                                    showViewsCount: isshowViewsCount
                                },
                                events: {
                                    loadeddata: function () {
                                        readyCount++;
                                        if (readyCount === liveDetails.videos.length) {											
										}											
                                    },
									ended: function ended(event) { 	
										getAppToken2("8");
									},
                                    onError: function onError(event) {                                      
										
                                    }
                                }
								});	
							
							} else {								
								player = new Player('#player' + i, {
                                type: Player.Type.VIDEO,
                                id: liveDetails.videos[i].id,
                                accountId: accountID,
                                token: memberToken,
                                playerVars: {
                                    loopPlay: Player.LoopPlay.NO,
                                    autoPlay: Player.AutoPlay.NO,
                                    playlistMenu: Player.PlaylistMenu.NO,
                                    showViewsCount: isshowViewsCount
                                },
                                events: {
                                    loadeddata: function () {
                                        readyCount++;
                                        if (readyCount === liveDetails.videos.length) {                                       
										}
                                    },
									ended: function ended(event) {    
										getAppToken2("9");
										
									},
                                  onError: function onError(event) {                                       
										
                                  }
                                }
								});								
							}
							
                        }
                    }
                }
            }
        })
}

//直接播放影片
function VidepPlay() {
    var videoid = varliveId; //$("#select_video").find(":selected").val();
    if (videoid != "") {
        //$.blockUI();
        $("#livePlayers").html("<div id='videoPlayer'></div>");
        player = new Player('#videoPlayer', {
            type: Player.Type.VIDEO,
            id: videoid,
            accountId: accountID,
            token: "",
            playerVars: {
                loopPlay: Player.LoopPlay.NO,
                autoPlay: (isautoplay === "y" ? Player.AutoPlay.YES : Player.AutoPlay.NO),
                playlistMenu: Player.PlaylistMenu.NO,
                showViewsCount: isshowViewsCount
            },
            events: {
                loadeddata: function () {
                    //$.unblockUI();
                }
            }
        });
    }
    else {
        $("#livePlayers").html("");
    }
}

function getAppToken2(id) {		
	var accountID = "", appToken = "", memberToken = "";
	var lives = [], playlists = [], videos = [];

	// Straas SDK Player
	var Player;
	var player;
	var StraaS = window.StraaS
	Player = StraaS.Player	
	
    $.getJSON(serverUrl + "/Straas/GetAppToken",
    {
        clientId: clientid,
        clientSecret: clientsecret
    },
    function (data, status, xhr) {
        if (data.msg == "OK") {		
			appToken = data.appToken.token;
            accountID = data.appToken.account_id;    
			LiveReplay2(id)
		}
	});	
}

function LiveReplay2(id) {		
    var liveId = varliveId;	
    $.getJSON(serverUrl + "/Straas/GetLiveDetails",
        {
            id: liveId,
            includes: "category,tags,monetizable_info,videos,sync_status_url_anatomy,owner",
            appToken: appToken
        },
        function (data, status, xhr) {			
            if (data.msg === "OK") {
                var liveDetails = data.liveDetails;
                if (liveDetails.ended_at === null) {
                    // 直播還未結束(包含直播開始前)                    
                    player = new Player('#livePlayer', {
                        type: Player.Type.LIVE,
                        id: liveId,
                        accountId: accountID,
                        token: memberToken,
                        playerVars: {
                            loopPlay: Player.LoopPlay.NO,
                            autoPlay: (isautoplay === "y" ? Player.AutoPlay.YES : Player.AutoPlay.NO),
                            playlistMenu: Player.PlaylistMenu.NO,
                            showViewsCount: isshowViewsCount
                        },
                        events: {                           
                            onError: function (event) {                                
                            },
                            loadstart: function (event) {                                
                            }
                        }
                    });
                } else {					
                    if (liveDetails.videos.length > 0) {						
						if (liveDetails.videos.length > 1) {
							for (i = 0; i < liveDetails.videos.length; i++) {
                                if (i == id)
                                {
									$("#player" + i).show(); //Show區塊
                                } else {
									$("#player" + i).hide(); //隱藏區塊
								}
                            }     	
                        }
						
						if (liveDetails.videos.length > 1) {
                            // 分段的影片，依照時間先後排序
                            for (i = 0; i < liveDetails.videos.length; i++) {
                                for (var j = i + 1; j < liveDetails.videos.length; j++) {
                                    if (liveDetails.videos[i].live_started_at > liveDetails.videos[j].live_started_at) {
                                        var temp = liveDetails.videos[i];
                                        liveDetails.videos[i] = liveDetails.videos[j];
                                        liveDetails.videos[j] = temp;
                                    }
                                }
                            }
                        }
						
                        // 依照直播影片段數，產生數個 Player
                        var readyCount = 0;
                        for (i = 0; i < liveDetails.videos.length; i++) {
							if (i == id)
							{
								if (i == parseInt(liveDetails.videos.length - 1))
								{	
									player = new Player('#player' + i, {
									type: Player.Type.VIDEO,
									id: liveDetails.videos[i].id,
									accountId: accountID,
									token: memberToken,
									playerVars: {
										loopPlay: Player.LoopPlay.NO,
										autoPlay: Player.AutoPlay.YES,
										playlistMenu: Player.PlaylistMenu.NO,
										showViewsCount: isshowViewsCount
									},
									events: {
										loadeddata: function () {
											readyCount++;
											if (readyCount === liveDetails.videos.length) {
												
											}											
										},
										ended: function ended(event) {
											
										},
										onError: function onError(event) {                                      
											
										}
									}
									});
								} else {		
									player = new Player('#player' + i, {
									type: Player.Type.VIDEO,
									id: liveDetails.videos[i].id,
									accountId: accountID,
									token: memberToken,
									playerVars: {
										loopPlay: Player.LoopPlay.NO,
										autoPlay: Player.AutoPlay.YES,
										playlistMenu: Player.PlaylistMenu.NO,
										showViewsCount: isshowViewsCount
									},
									events: {
										loadeddata: function () {
											readyCount++;
											if (readyCount === liveDetails.videos.length) {
												
											}											
										},
										ended: function ended(event) {
											getAppToken2(parseInt(id) + 1);
										},
										onError: function onError(event) {                                      
											
										}
									}
									});
								}								
								
							} else {		
								player = new Player('#player' + i, {
									type: Player.Type.VIDEO,
									id: liveDetails.videos[i].id,
									accountId: accountID,
									token: memberToken,
									playerVars: {
										loopPlay: Player.LoopPlay.NO,
										autoPlay: Player.AutoPlay.NO,
										playlistMenu: Player.PlaylistMenu.NO,
										showViewsCount: isshowViewsCount
									},
									events: {
										loadeddata: function () {
											readyCount++;
											if (readyCount === liveDetails.videos.length) {
												
											}											
										},
										ended: function ended(event) {
											
										},
										onError: function onError(event) {                                      
											
										}
									}
								});
							}	              
                        }
                    }
                }
            }
        })
}