var Path        = require( "path" ) ,
    cofs        = require( "co-fs" ) ,
    Handle      = require( "./handle" ) ,
    mockOpt ;

function* find( url ){
    var _config     = yield cofs.readFile( Path.resolve( mockOpt.mockPath , "config.json" ) ) ,
        _file;
    try{
        _config         = JSON.parse( String( _config ).replace( /^\\+.*/ , "" ).replace( /\s/gi , "" ) );
    } catch( e ){
        console.warn( "mock config.json has error" );
        return false;
    }
    if( !_config[ url ] ){
        return false;
    }
    try {
        _file   = require( Path.resolve( mockOpt.mockPath , _config[ url ] ) );
        _file   = Handle.gen( _file );
    } catch( e ){
        _file   = false;
    }        
    return _file;
}

module.exports  = function( opt ){
    mockOpt         = opt;
    return {
        postMock    : function*( url ){
            var _json   = yield find( url );
            if( _json ){
                return _json;
            } else {
                return yield mockOpt.post.apply( mockOpt , Array.prototype.slice.call( arguments ) );
            };
        } ,
        getMock     : function*( url ){
            var _json   = yield find( url );
            if( _json ){
                return _json;
            } else {
                return yield mockOpt.get.apply( mockOpt , Array.prototype.slice.call( arguments ) );
            };
        }
    }
}