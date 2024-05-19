function initBuffers(gl) {

    const positionBuffer = initPositionBuffer(gl);
    return {
        position: positionBuffer,
    };
}

function initPositionBuffer(gl) {

    const positionBuffer = gl.createBuffer();
    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    return positionBuffer;
}

export { initBuffers };
