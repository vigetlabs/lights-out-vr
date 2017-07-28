uniform vec3 bottomColor;
uniform vec3 topColor;
uniform float offset;
uniform float exponent;

varying vec3 vWorldPosition;

void main() {
    float r = bottomColor.x / 255.0;
    float g = bottomColor.y / 255.0;
    float b = bottomColor.z / 255.0;
    vec3 bColor = vec3(r, g, b);

    r = topColor.x / 255.0;
    g = topColor.y / 255.0;
    b = topColor.z / 255.0;
    vec3 tColor = vec3(r, g, b);

    float h = normalize(vWorldPosition + offset).z;
    float interp = max( pow( max( -h, 0.0 ), exponent ), 0.0 );
    vec3 mixedColor = mix(bColor, tColor, interp)

    gl_FragColor = vec4(mixedColor, 1.0);
}