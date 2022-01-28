import SimplexNoise from "./lib/SimplexNoise";

const VSDefault = `
uniform float time;
uniform float effect;

varying vec3 v_normal;
varying vec3 v_position;
varying vec2 v_uv;

${SimplexNoise}

void main() {
	v_normal = normalMatrix * normalize(normal);
	v_position = position;
	v_uv = uv;

	float time_shift = time * .2;
	float noise_x = snoise((position + vec3(100. + time_shift, .0, .0)) * 10.) * .02;
	float noise_y = snoise((position + vec3(.0, 100. + time_shift, .0)) * 10.) * .02;
	float noise_z = snoise((position + vec3(.0, .0, 100. + time_shift)) * 10.) * .02;
	vec3 noise_position = position + vec3(noise_x, noise_y, noise_z);

	vec3 final_position = mix(position, noise_position, effect);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(final_position, 1.0);
}
`;

export default VSDefault;
