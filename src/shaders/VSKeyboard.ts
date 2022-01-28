const VSKeyboard = `
uniform float time;
uniform float effect;

varying vec3 v_normal;
varying vec3 v_position;

void main() {
	v_normal = normalMatrix * normalize(normal);
	v_position = position;

	float wave_frequency = 40.;
	vec3 wave_position = vec3(position.x, sin((position.x + (time * .1)) * wave_frequency) * .5 + .5, position.z);
	wave_position.y *= .02; // Amplitude
	wave_position.y += position.y + .02; // Offset

	vec3 final_position = mix(position, wave_position, effect);

	gl_Position = projectionMatrix * modelViewMatrix * vec4(final_position, 1.0);
}
`;

export default VSKeyboard;
