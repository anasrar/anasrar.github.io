const FSNormal = `
uniform float time;
uniform float effect;

varying vec3 v_normal;
varying vec3 v_position;

void main() {
	vec3 color_normal = normalize(v_normal) * .5 + .5;
	gl_FragColor = vec4(color_normal, 1.0);
}
`;

export default FSNormal;
