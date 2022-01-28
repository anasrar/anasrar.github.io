const FSScreen = `
uniform float time;
uniform float effect;

varying vec3 v_normal;
varying vec3 v_position;
varying vec2 v_uv;

// https://www.shadertoy.com/view/3d3fR7
float noise(vec2 pos, float evolve) {
    
    // Loop the evolution (over a very long period of time).
    float e = fract((evolve*0.01));
    
    // Coordinates
    float cx  = pos.x*e;
    float cy  = pos.y*e;
    
    // Generate a "random" black or white value
    return fract(23.0*fract(2.0/fract(fract(cx*2.4/cy*23.0+pow(abs(cy/22.4),3.3))*fract(cx*evolve/pow(abs(cy),0.050)))));
}

void main() {
	vec3 normal_color = normalize(v_normal) * .5 + .5;
	vec3 noise_color = vec3(noise(v_uv, time));
	vec3 final_color = mix(normal_color, noise_color, effect);
	gl_FragColor = vec4(final_color, 1.0);
}
`;

export default FSScreen;
