class ThreeJSStairs {

    constructor( N, periods, rMin, rMax, stairsStep ) {

        this.bufferGeometry = new THREE.BufferGeometry();
        var alpha = Math.PI * 2 * periods / N;

        var bufferVertices = [];
        var vertices = [];

        var addBuffVertice = function ( index ) {

            var tempVertice = vertices[index];

            bufferVertices.push( tempVertice.x );
            bufferVertices.push( tempVertice.y );
            bufferVertices.push( tempVertice.z );

        }

        var addTopFace = function ( i, x1, x2, x3, z1, z2, z3, height ) {

            vertices.push( new THREE.Vector3( x1, height, z1) );
            vertices.push( new THREE.Vector3( x2, height, z2) );
            vertices.push( new THREE.Vector3( x3, height, z3) );
            vertices.push( new THREE.Vector3( x4, height, z4) );

            addBuffVertice( i );
            addBuffVertice( i + 1 );
            addBuffVertice( i + 2 );
            addBuffVertice( i + 2 );
            addBuffVertice( i + 3 );
            addBuffVertice( i + 1 );

        }

        var addSideTopFace = function ( i ) {

            addBuffVertice( i );
            addBuffVertice( i + 2 );
            addBuffVertice( i + 4 );
            addBuffVertice( i + 2 );
            addBuffVertice( i + 4 );
            addBuffVertice( i + 6 );

        }

        var addSideBottom = function ( i ) {

            addBuffVertice( i + 1 );
            addBuffVertice( i + 3 );
            addBuffVertice( i + 5 );
            addBuffVertice( i + 5 );
            addBuffVertice( i + 3 );
            addBuffVertice( i + 7 );

        }

        var addSideRight = function ( i ) {

            addBuffVertice( i );
            addBuffVertice( i + 1 );
            addBuffVertice( i + 4 );
            addBuffVertice( i + 4 );
            addBuffVertice( i + 1 );
            addBuffVertice( i + 5 );

        }

        var addSideLeft = function ( i ) {

            addBuffVertice( i + 2 );
            addBuffVertice( i + 3 );
            addBuffVertice( i + 6 );
            addBuffVertice( i + 3 );
            addBuffVertice( i + 6 );
            addBuffVertice( i + 7 );

        }

        var help = 0;

        for ( var i = 0; i < N + 1; i++ ) {

            var cRot = alpha * ( i );
            var nextCrot = alpha * ( i + 1 );

            var height = stairsStep * ( i );

            var x1 = rMin * Math.cos( cRot );
            var x2 = rMax * Math.cos( cRot );

            var z1 = rMin * Math.sin( cRot );
            var z2 = rMax * Math.sin( cRot );

            var x3 = rMin * Math.cos( nextCrot );
            var x4 = rMax * Math.cos( nextCrot );

            var z3 = rMin * Math.sin( nextCrot );
            var z4 = rMax * Math.sin( nextCrot ); 

            //Top
            addTopFace ( help, x1, x2, x3, z1, z2, z3, height );

            //Bottom
            addTopFace ( help + 4, x1, x2, x3, z1, z2, z3, height + stairsStep );

            addSideTopFace( help );
            addSideBottom( help );
            addSideRight( help );
            addSideLeft( help );
            // addBottomConnect( help );
            help += 4;

        }

        var verticesFloarArray = new Float32Array( bufferVertices );
        this.bufferGeometry.addAttribute( 'position', new THREE.BufferAttribute( verticesFloarArray, 3 ), true );

    }

};