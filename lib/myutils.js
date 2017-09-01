function initShaders(gl, vertexShaderSource, fragmentShaderSource) {
    var program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) {
        console.log('Failed to create program');
        return false;
    }

    gl.useProgram(program);
    gl.program = program;

    return true;
}

function loadShader(gl, type, source) {
    // create shader object
    var shader = gl.createShader(type);
    if (shader == null) {
        console.log('unable to create shader');
        return null;
    }

    // set shader source code
    gl.shaderSource(shader, source);

    // compile the shader
    gl.compileShader(shader);

    // check compile status
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        console.log('Failed to compile shader: ' + error);
        return null;
    }

    return shader;
}

function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) {
        return null;
    }

    // create a program object
    var program = gl.createProgram();
    if (!program) {
        console.log('gl.createProgram failed');
        return null;
    }

    // attach  the shader objects
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // link the program object
    gl.linkProgram(program);

    // check link status
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = gl.getProgramInfoLog(program);
        console.log('Failed to link program: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
    }

    return program;
}