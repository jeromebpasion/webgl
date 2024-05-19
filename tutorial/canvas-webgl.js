import { initBuffers } from "./init-buffers.js";
import { drawScene } from "./draw-scene.js";

main();

function main() {

    const canvas = document.querySelector('#glcanvas');
    
    const gl = canvas.getContext("webgl");
    
    if (gl === null) {
        alert(
            "Unable to initialize WebGL."
        );
    }

    const vertexShaderSource =`
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        
        void main() {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
        
    `;

    const fragmentShaderSource =`
        void main() {
            gl_FragColor = vec4(1.0,1.0,1.0,1.0);
        }
    `;

    const shaderProgram = initShaderProgram(gl, vertexShaderSource, fragmentShaderSource);

    //find and store location of attributes and uniforms from the shaders
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        },
        uniformLocations: {
            //uniforms in the shader source
            projectionMatrix : gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
            modelViewMatrix : gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        },
    };

    // Set clear color fully opaque
    gl.clearColor(0.3, 0.6, 0.4, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    const buffers = initBuffers(gl);
    drawScene(gl, programInfo, buffers);
}

function initShaderProgram(gl, vSource, fSource){

        const vShader = loadShader(gl, gl.VERTEX_SHADER, vSource);
        const fShader = loadShader(gl, gl.FRAGMENT_SHADER, fSource);    
    
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vShader);
        gl.attachShader(shaderProgram, fShader);
        gl.linkProgram(shaderProgram);
    
        return shaderProgram;
}

function loadShader(gl, type, source) {

    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    //error checking
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(
            `Error during shader compile: ${gl.getShaderInfoLog(shader)}`,
        );
        gl.deleteShader(shader);
        return null;
    };
    return shader;

}