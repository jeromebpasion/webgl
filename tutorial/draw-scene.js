function drawScene(gl, programInfo, buffers) {

    gl.clearColor(0.5, 0.4, 0.4, 1.0);
    gl.clearDepth(1.0);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //setup of projection dimensions
    const fov = (45 * Math.PI) / 180;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMat = mat4.create();
    mat4.perspective(projectionMat, fov, aspect, zNear, zFar);

    //setup of modelview
    const modelViewMat = mat4.create();
    mat4.translate(
        modelViewMat,
        modelViewMat,
        [0.0, 0.0, -6.0]
    );

    //gather info from shaders
    setPositionAttribute(gl, programInfo, buffers);

    try {
        gl.useProgram(programInfo.program);
    } catch (error) {
        console.log(error);
    }

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix, false, projectionMat,

    );
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix, false, modelViewMat,
    
    );

    //draw a rectangle
    {
        const offset = 0;
        const vertexCount = 4;
        gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
}

//Hook and enable the buffers with attribute info
function setPositionAttribute(gl, programInfo, buffers){
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);

    //setup vertex data in buffer
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPos,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPos);

}

export { drawScene };
