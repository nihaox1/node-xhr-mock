var http        = require( "http" ) ,
    path        = require( "path" ) ,
    koaHttpMock = require( "../" ) ,
    koa         = require( "koa" ) ,
    app         = koa() ,
    port        = 18001;

mock    = koaHttpMock( {
    mockPath    : path.resolve( process.cwd() , "../mock" ) ,
    post        : function( url , postData ){
        var _self       = this ,
            _cb ,
            _result ,
            _called ,
            _dataStr    = JSON.stringify( postData ) ,
            _done   = function(){
                if( !_called && _result !== undefined && _cb ){
                    _cb.call( this , null , JSON.parse( _result ) );
                    _called = true;
                }
            } ,
            _error  = function( e ){
                clearTimeout( _abort );
                _result     = JSON.stringify( { error : -9 } );
                _done();
            } ,
            _req ,
            _abort;

        _req = http.request( {
                hostname    : "app.zaijiadd.com" ,
                port        : 80 ,
                path        : url,
                method      : "POST",
            } , function( res ){
                var _data   = "";
                res.on( "data" , function( chunk ){
                    _data   += chunk;
                } ).on( "end" , function(){
                    _result     = String( _data );
                    if( res.statusCode === 200 ){
                        _done();
                    } else {
                        _error( url + " : statusCode=" + res.statusCode + "\n" + _result );
                    }
                } );
            });
        _req.on( "error" , _error );
        _req.write( _dataStr );
        _req.end();
        return function( fn ){
            _cb     = fn;
            _done();
        }
    } ,
    get        : function( url , postData ){
        var _self       = this ,
            _cb ,
            _result ,
            _called ,
            _dataStr    = JSON.stringify( postData ) ,
            _done   = function(){
                if( !_called && _result !== undefined && _cb ){
                    _cb.call( this , null , JSON.parse( _result ) );
                    _called = true;
                }
            } ,
            _error  = function( e ){
                clearTimeout( _abort );
                _result     = JSON.stringify( { error : -9 } );
                _done();
            } ,
            _req ,
            _abort;

        _req = http.request( {
                hostname    : "app.zaijiadd.com" ,
                port        : 80 ,
                path        : url,
                method      : "get",
            } , function( res ){
                var _data   = "";
                res.on( "data" , function( chunk ){
                    _data   += chunk;
                } ).on( "end" , function(){
                    _result     = String( _data );
                    if( res.statusCode === 200 ){
                        _done();
                    } else {
                        _error( url + " : statusCode=" + res.statusCode + "\n" + _result );
                    }
                } );
            });
        _req.on( "error" , _error );
        _req.write( _dataStr );
        _req.end();
        return function( fn ){
            _cb     = fn;
            _done();
        }
    } 
} );

app.use( function*(){
    var _data   = yield mock.postMock( "/user/user-list.php" , { type : 1 } );
    this.body   = _data;
} );

app.listen( port );
console.log( "server listening to port %d" , port );