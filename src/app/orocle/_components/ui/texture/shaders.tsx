export const fragmentShader = `
// Fragment shader
// Uniforms

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_intensity;
uniform vec4 u_colors[2];
uniform float u_speed;
uniform float u_scale;

varying vec2 vUv;
varying float vDisplacement;
varying vec3 pos;

#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif

#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif

#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT
float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
#endif


#ifndef FNC_QUINTIC
#define FNC_QUINTIC 

float quintic(const in float v) { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec2  quintic(const in vec2 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec3  quintic(const in vec3 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec4  quintic(const in vec4 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }

#endif



#ifndef FNC_PNOISE
#define FNC_PNOISE

float pnoise(in vec2 P, in vec2 rep) {
vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
Pi = mod(Pi, rep.xyxy); 
Pi = mod289(Pi);        
vec4 ix = Pi.xzxz;
vec4 iy = Pi.yyww;
vec4 fx = Pf.xzxz;
vec4 fy = Pf.yyww;

vec4 i = permute(permute(ix) + iy);

vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
vec4 gy = abs(gx) - 0.5 ;
vec4 tx = floor(gx + 0.5);
gx = gx - tx;

vec2 g00 = vec2(gx.x,gy.x);
vec2 g10 = vec2(gx.y,gy.y);
vec2 g01 = vec2(gx.z,gy.z);
vec2 g11 = vec2(gx.w,gy.w);

vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
g00 *= norm.x;
g01 *= norm.y;
g10 *= norm.z;
g11 *= norm.w;

float n00 = dot(g00, vec2(fx.x, fy.x));
float n10 = dot(g10, vec2(fx.y, fy.y));
float n01 = dot(g01, vec2(fx.z, fy.z));
float n11 = dot(g11, vec2(fx.w, fy.w));

vec2 fade_xy = quintic(Pf.xy);
vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
return 2.3 * n_xy;
}

float pnoise(in vec3 P, in vec3 rep) {
vec3 Pi0 = mod(floor(P), rep); 
vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); 
Pi0 = mod289(Pi0);
Pi1 = mod289(Pi1);
vec3 Pf0 = fract(P); 
vec3 Pf1 = Pf0 - vec3(1.0); 
vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
vec4 iy = vec4(Pi0.yy, Pi1.yy);
vec4 iz0 = Pi0.zzzz;
vec4 iz1 = Pi1.zzzz;

vec4 ixy = permute(permute(ix) + iy);
vec4 ixy0 = permute(ixy + iz0);
vec4 ixy1 = permute(ixy + iz1);

vec4 gx0 = ixy0 * (1.0 / 7.0);
vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
gx0 = fract(gx0);
vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
vec4 sz0 = step(gz0, vec4(0.0));
gx0 -= sz0 * (step(0.0, gx0) - 0.5);
gy0 -= sz0 * (step(0.0, gy0) - 0.5);

vec4 gx1 = ixy1 * (1.0 / 7.0);
vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
gx1 = fract(gx1);
vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
vec4 sz1 = step(gz1, vec4(0.0));
gx1 -= sz1 * (step(0.0, gx1) - 0.5);
gy1 -= sz1 * (step(0.0, gy1) - 0.5);

vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
g000 *= norm0.x;
g010 *= norm0.y;
g100 *= norm0.z;
g110 *= norm0.w;
vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
g001 *= norm1.x;
g011 *= norm1.y;
g101 *= norm1.z;
g111 *= norm1.w;

float n000 = dot(g000, Pf0);
float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
float n111 = dot(g111, Pf1);

vec3 fade_xyz = quintic(Pf0);
vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
return 2.2 * n_xyz;
}

float pnoise(in vec4 P, in vec4 rep) {
vec4 Pi0 = mod(floor(P), rep); 
vec4 Pi1 = mod(Pi0 + 1.0, rep); 
Pi0 = mod289(Pi0);
Pi1 = mod289(Pi1);
vec4 Pf0 = fract(P); 
vec4 Pf1 = Pf0 - 1.0; 
vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
vec4 iy = vec4(Pi0.yy, Pi1.yy);
vec4 iz0 = vec4(Pi0.zzzz);
vec4 iz1 = vec4(Pi1.zzzz);
vec4 iw0 = vec4(Pi0.wwww);
vec4 iw1 = vec4(Pi1.wwww);

vec4 ixy = permute(permute(ix) + iy);
vec4 ixy0 = permute(ixy + iz0);
vec4 ixy1 = permute(ixy + iz1);
vec4 ixy00 = permute(ixy0 + iw0);
vec4 ixy01 = permute(ixy0 + iw1);
vec4 ixy10 = permute(ixy1 + iw0);
vec4 ixy11 = permute(ixy1 + iw1);

vec4 gx00 = ixy00 * (1.0 / 7.0);
vec4 gy00 = floor(gx00) * (1.0 / 7.0);
vec4 gz00 = floor(gy00) * (1.0 / 6.0);
gx00 = fract(gx00) - 0.5;
gy00 = fract(gy00) - 0.5;
gz00 = fract(gz00) - 0.5;
vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
vec4 sw00 = step(gw00, vec4(0.0));
gx00 -= sw00 * (step(0.0, gx00) - 0.5);
gy00 -= sw00 * (step(0.0, gy00) - 0.5);

vec4 gx01 = ixy01 * (1.0 / 7.0);
vec4 gy01 = floor(gx01) * (1.0 / 7.0);
vec4 gz01 = floor(gy01) * (1.0 / 6.0);
gx01 = fract(gx01) - 0.5;
gy01 = fract(gy01) - 0.5;
gz01 = fract(gz01) - 0.5;
vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
vec4 sw01 = step(gw01, vec4(0.0));
gx01 -= sw01 * (step(0.0, gx01) - 0.5);
gy01 -= sw01 * (step(0.0, gy01) - 0.5);

vec4 gx10 = ixy10 * (1.0 / 7.0);
vec4 gy10 = floor(gx10) * (1.0 / 7.0);
vec4 gz10 = floor(gy10) * (1.0 / 6.0);
gx10 = fract(gx10) - 0.5;
gy10 = fract(gy10) - 0.5;
gz10 = fract(gz10) - 0.5;
vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
vec4 sw10 = step(gw10, vec4(0.0));
gx10 -= sw10 * (step(0.0, gx10) - 0.5);
gy10 -= sw10 * (step(0.0, gy10) - 0.5);

vec4 gx11 = ixy11 * (1.0 / 7.0);
vec4 gy11 = floor(gx11) * (1.0 / 7.0);
vec4 gz11 = floor(gy11) * (1.0 / 6.0);
gx11 = fract(gx11) - 0.5;
gy11 = fract(gy11) - 0.5;
gz11 = fract(gz11) - 0.5;
vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
vec4 sw11 = step(gw11, vec4(0.0));
gx11 -= sw11 * (step(0.0, gx11) - 0.5);
gy11 -= sw11 * (step(0.0, gy11) - 0.5);

vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
g0000 *= norm00.x;
g0100 *= norm00.y;
g1000 *= norm00.z;
g1100 *= norm00.w;

vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
g0001 *= norm01.x;
g0101 *= norm01.y;
g1001 *= norm01.z;
g1101 *= norm01.w;

vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
g0010 *= norm10.x;
g0110 *= norm10.y;
g1010 *= norm10.z;
g1110 *= norm10.w;

vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
g0011 *= norm11.x;
g0111 *= norm11.y;
g1011 *= norm11.z;
g1111 *= norm11.w;

float n0000 = dot(g0000, Pf0);
float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
float n1111 = dot(g1111, Pf1);

vec4 fade_xyzw = quintic(Pf0);
vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
return 2.2 * n_xyzw;
}
#endif

#ifndef SRGB_EPSILON 
#define SRGB_EPSILON 0.00000001
#endif

#ifndef FNC_SRGB2RGB
#define FNC_SRGB2RGB




float srgb2rgb(float channel) {
return (channel < 0.04045) ? channel * 0.0773993808 : pow((channel + 0.055) * 0.947867298578199, 2.4);
}

vec3 srgb2rgb(vec3 srgb) {
return vec3(srgb2rgb(srgb.r + SRGB_EPSILON), 
            srgb2rgb(srgb.g + SRGB_EPSILON),                 srgb2rgb(srgb.b + SRGB_EPSILON));
}

vec4 srgb2rgb(vec4 srgb) {
return vec4(srgb2rgb(srgb.rgb), srgb.a);
}

#endif


#if !defined(FNC_SATURATE) && !defined(saturate)
#define FNC_SATURATE
#define saturate(x) clamp(x, 0.0, 1.0)
#endif



#ifndef SRGB_EPSILON 
#define SRGB_EPSILON 0.00000001
#endif

#ifndef FNC_RGB2SRGB
#define FNC_RGB2SRGB


float rgb2srgb(float channel) {
return (channel < 0.0031308) ? channel * 12.92 : 1.055 * pow(channel, 0.4166666666666667) - 0.055;
}

vec3 rgb2srgb(vec3 rgb) {
return saturate(vec3(rgb2srgb(rgb.r - SRGB_EPSILON), rgb2srgb(rgb.g - SRGB_EPSILON), rgb2srgb(rgb.b - SRGB_EPSILON)));
}

vec4 rgb2srgb(vec4 rgb) {
return vec4(rgb2srgb(rgb.rgb), rgb.a);
}

#endif



#ifndef FNC_MIXOKLAB
#define FNC_MIXOKLAB
vec3 mixOklab( vec3 colA, vec3 colB, float h ) {

#ifdef MIXOKLAB_COLORSPACE_SRGB
colA = srgb2rgb(colA);
colB = srgb2rgb(colB);
#endif


const mat3 kCONEtoLMS = mat3(                
        0.4121656120,  0.2118591070,  0.0883097947,
        0.5362752080,  0.6807189584,  0.2818474174,
        0.0514575653,  0.1074065790,  0.6302613616);
const mat3 kLMStoCONE = mat3(
        4.0767245293, -1.2681437731, -0.0041119885,
    -3.3072168827,  2.6093323231, -0.7034763098,
        0.2307590544, -0.3411344290,  1.7068625689);
                

vec3 lmsA = pow( kCONEtoLMS * colA, vec3(1.0/3.0) );
vec3 lmsB = pow( kCONEtoLMS * colB, vec3(1.0/3.0) );

vec3 lms = mix( lmsA, lmsB, h );


vec3 rgb = kLMStoCONE*(lms*lms*lms);

#ifdef MIXOKLAB_COLORSPACE_SRGB
return rgb2srgb(rgb);
#else
return rgb;
#endif
}

vec4 mixOklab( vec4 colA, vec4 colB, float h ) {
return vec4( mixOklab(colA.rgb, colB.rgb, h), mix(colA.a, colB.a, h) );
}
#endif



void main() {

vec2 pixel = 1.0/u_resolution.xy;

vec2 st = gl_FragCoord.xy * pixel;



float distort = vDisplacement * u_intensity;

vec2 val = abs(vUv - 0.5) * 3.0  * (1.0 - distort);



vec4 color = vec4(vec3(val,u_colors[0].b),1.0);

color = mixOklab(u_colors[0], u_colors[1], vDisplacement);

gl_FragColor = color;

}
`
export const vertexShader = `
//Geometry: plane

//OrbitControls: false

//Geometry-args: [3,1,2048]

//Mesh-scale: 1.5

//Mesh-rotation: [-0.75,0.25,-0.25]

//camera-position: [0.0, 0.0, 2.0]

//shader-wireframe: false 



uniform float u_intensity;

uniform float u_time;

uniform float u_speed;

uniform bool u_rotate;

uniform float u_scale;



varying vec2 vUv;

varying float vDisplacement;

varying vec3 pos;







#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif





#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif



#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT
float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
#endif


#ifndef FNC_QUINTIC
#define FNC_QUINTIC 

float quintic(const in float v) { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec2  quintic(const in vec2 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec3  quintic(const in vec3 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec4  quintic(const in vec4 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }

#endif



#ifndef FNC_CNOISE
#define FNC_CNOISE

float cnoise(in vec2 P) {
vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
Pi = mod289(Pi); 
vec4 ix = Pi.xzxz;
vec4 iy = Pi.yyww;
vec4 fx = Pf.xzxz;
vec4 fy = Pf.yyww;

vec4 i = permute(permute(ix) + iy);

vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
vec4 gy = abs(gx) - 0.5 ;
vec4 tx = floor(gx + 0.5);
gx = gx - tx;

vec2 g00 = vec2(gx.x,gy.x);
vec2 g10 = vec2(gx.y,gy.y);
vec2 g01 = vec2(gx.z,gy.z);
vec2 g11 = vec2(gx.w,gy.w);

vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
g00 *= norm.x;
g01 *= norm.y;
g10 *= norm.z;
g11 *= norm.w;

float n00 = dot(g00, vec2(fx.x, fy.x));
float n10 = dot(g10, vec2(fx.y, fy.y));
float n01 = dot(g01, vec2(fx.z, fy.z));
float n11 = dot(g11, vec2(fx.w, fy.w));

vec2 fade_xy = quintic(Pf.xy);
vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
return 2.3 * n_xy;
}

float cnoise(in vec3 P) {
vec3 Pi0 = floor(P); 
vec3 Pi1 = Pi0 + vec3(1.0); 
Pi0 = mod289(Pi0);
Pi1 = mod289(Pi1);
vec3 Pf0 = fract(P); 
vec3 Pf1 = Pf0 - vec3(1.0); 
vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
vec4 iy = vec4(Pi0.yy, Pi1.yy);
vec4 iz0 = Pi0.zzzz;
vec4 iz1 = Pi1.zzzz;

vec4 ixy = permute(permute(ix) + iy);
vec4 ixy0 = permute(ixy + iz0);
vec4 ixy1 = permute(ixy + iz1);

vec4 gx0 = ixy0 * (1.0 / 7.0);
vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
gx0 = fract(gx0);
vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
vec4 sz0 = step(gz0, vec4(0.0));
gx0 -= sz0 * (step(0.0, gx0) - 0.5);
gy0 -= sz0 * (step(0.0, gy0) - 0.5);

vec4 gx1 = ixy1 * (1.0 / 7.0);
vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
gx1 = fract(gx1);
vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
vec4 sz1 = step(gz1, vec4(0.0));
gx1 -= sz1 * (step(0.0, gx1) - 0.5);
gy1 -= sz1 * (step(0.0, gy1) - 0.5);

vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
g000 *= norm0.x;
g010 *= norm0.y;
g100 *= norm0.z;
g110 *= norm0.w;
vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
g001 *= norm1.x;
g011 *= norm1.y;
g101 *= norm1.z;
g111 *= norm1.w;

float n000 = dot(g000, Pf0);
float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
float n111 = dot(g111, Pf1);

vec3 fade_xyz = quintic(Pf0);
vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
return 2.2 * n_xyz;
}

float cnoise(in vec4 P) {
vec4 Pi0 = floor(P); 
vec4 Pi1 = Pi0 + 1.0; 
Pi0 = mod289(Pi0);
Pi1 = mod289(Pi1);
vec4 Pf0 = fract(P); 
vec4 Pf1 = Pf0 - 1.0; 
vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
vec4 iy = vec4(Pi0.yy, Pi1.yy);
vec4 iz0 = vec4(Pi0.zzzz);
vec4 iz1 = vec4(Pi1.zzzz);
vec4 iw0 = vec4(Pi0.wwww);
vec4 iw1 = vec4(Pi1.wwww);

vec4 ixy = permute(permute(ix) + iy);
vec4 ixy0 = permute(ixy + iz0);
vec4 ixy1 = permute(ixy + iz1);
vec4 ixy00 = permute(ixy0 + iw0);
vec4 ixy01 = permute(ixy0 + iw1);
vec4 ixy10 = permute(ixy1 + iw0);
vec4 ixy11 = permute(ixy1 + iw1);

vec4 gx00 = ixy00 * (1.0 / 7.0);
vec4 gy00 = floor(gx00) * (1.0 / 7.0);
vec4 gz00 = floor(gy00) * (1.0 / 6.0);
gx00 = fract(gx00) - 0.5;
gy00 = fract(gy00) - 0.5;
gz00 = fract(gz00) - 0.5;
vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
vec4 sw00 = step(gw00, vec4(0.0));
gx00 -= sw00 * (step(0.0, gx00) - 0.5);
gy00 -= sw00 * (step(0.0, gy00) - 0.5);

vec4 gx01 = ixy01 * (1.0 / 7.0);
vec4 gy01 = floor(gx01) * (1.0 / 7.0);
vec4 gz01 = floor(gy01) * (1.0 / 6.0);
gx01 = fract(gx01) - 0.5;
gy01 = fract(gy01) - 0.5;
gz01 = fract(gz01) - 0.5;
vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
vec4 sw01 = step(gw01, vec4(0.0));
gx01 -= sw01 * (step(0.0, gx01) - 0.5);
gy01 -= sw01 * (step(0.0, gy01) - 0.5);

vec4 gx10 = ixy10 * (1.0 / 7.0);
vec4 gy10 = floor(gx10) * (1.0 / 7.0);
vec4 gz10 = floor(gy10) * (1.0 / 6.0);
gx10 = fract(gx10) - 0.5;
gy10 = fract(gy10) - 0.5;
gz10 = fract(gz10) - 0.5;
vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
vec4 sw10 = step(gw10, vec4(0.0));
gx10 -= sw10 * (step(0.0, gx10) - 0.5);
gy10 -= sw10 * (step(0.0, gy10) - 0.5);

vec4 gx11 = ixy11 * (1.0 / 7.0);
vec4 gy11 = floor(gx11) * (1.0 / 7.0);
vec4 gz11 = floor(gy11) * (1.0 / 6.0);
gx11 = fract(gx11) - 0.5;
gy11 = fract(gy11) - 0.5;
gz11 = fract(gz11) - 0.5;
vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
vec4 sw11 = step(gw11, vec4(0.0));
gx11 -= sw11 * (step(0.0, gx11) - 0.5);
gy11 -= sw11 * (step(0.0, gy11) - 0.5);

vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
g0000 *= norm00.x;
g0100 *= norm00.y;
g1000 *= norm00.z;
g1100 *= norm00.w;

vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
g0001 *= norm01.x;
g0101 *= norm01.y;
g1001 *= norm01.z;
g1101 *= norm01.w;

vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
g0010 *= norm10.x;
g0110 *= norm10.y;
g1010 *= norm10.z;
g1110 *= norm10.w;

vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
g0011 *= norm11.x;
g0111 *= norm11.y;
g1011 *= norm11.z;
g1111 *= norm11.w;

float n0000 = dot(g0000, Pf0);
float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
float n1111 = dot(g1111, Pf1);

vec4 fade_xyzw = quintic(Pf0);
vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
return 2.2 * n_xyzw;
}
#endif






#ifndef RANDOM_SCALE
#if defined(RANDOM_HIGHER_RANGE)
#define RANDOM_SCALE vec4(.1031, .1030, .0973, .1099)
#else
#define RANDOM_SCALE vec4(443.897, 441.423, .0973, .1099)
#endif
#endif

#ifndef FNC_RANDOM
#define FNC_RANDOM
float random(in float x) {
#if defined(RANDOM_SINLESS)
x = fract(x * RANDOM_SCALE.x);
x *= x + 33.33;
x *= x + x;
return fract(x);
#else
return fract(sin(x) * 43758.5453);
#endif
}

float random(in vec2 st) {
#if defined(RANDOM_SINLESS)
vec3 p3  = fract(vec3(st.xyx) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 33.33);
return fract((p3.x + p3.y) * p3.z);
#else
return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
#endif
}

float random(in vec3 pos) {
#if defined(RANDOM_SINLESS)
pos  = fract(pos * RANDOM_SCALE.xyz);
pos += dot(pos, pos.zyx + 31.32);
return fract((pos.x + pos.y) * pos.z);
#else
return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
#endif
}

float random(in vec4 pos) {
#if defined(RANDOM_SINLESS)
pos = fract(pos * RANDOM_SCALE);
pos += dot(pos, pos.wzxy+33.33);
return fract((pos.x + pos.y) * (pos.z + pos.w));
#else
float dot_product = dot(pos, vec4(12.9898,78.233,45.164,94.673));
return fract(sin(dot_product) * 43758.5453);
#endif
}

vec2 random2(float p) {
vec3 p3 = fract(vec3(p) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xx + p3.yz) * p3.zy);
}

vec2 random2(vec2 p) {
vec3 p3 = fract(p.xyx * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xx + p3.yz) * p3.zy);
}

vec2 random2(vec3 p3) {
p3 = fract(p3 * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xx + p3.yz) * p3.zy);
}

vec3 random3(float p) {
vec3 p3 = fract(vec3(p) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xxy + p3.yzz) * p3.zyx); 
}

vec3 random3(vec2 p) {
vec3 p3 = fract(vec3(p.xyx) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yxz + 19.19);
return fract((p3.xxy + p3.yzz) * p3.zyx);
}

vec3 random3(vec3 p) {
p = fract(p * RANDOM_SCALE.xyz);
p += dot(p, p.yxz + 19.19);
return fract((p.xxy + p.yzz) * p.zyx);
}

vec4 random4(float p) {
vec4 p4 = fract(p * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);   
}

vec4 random4(vec2 p) {
vec4 p4 = fract(p.xyxy * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

vec4 random4(vec3 p) {
vec4 p4 = fract(p.xyzx  * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

vec4 random4(vec4 p4) {
p4 = fract(p4  * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}


#endif



#ifndef FNC_SRANDOM
#define FNC_SRANDOM

float srandom(in float x) {
return -1. + 2. * fract(sin(x) * 43758.5453);
}

float srandom(in vec2 st) {
return -1. + 2. * fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float srandom(in vec3 pos) {
return -1. + 2. * fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

float srandom(in vec4 pos) {
float dot_product = dot(pos, vec4(12.9898,78.233,45.164,94.673));
return -1. + 2. * fract(sin(dot_product) * 43758.5453);
}

vec2 srandom2(in vec2 st) {
const vec2 k = vec2(.3183099, .3678794);
st = st * k + k.yx;
return -1. + 2. * fract(16. * k * fract(st.x * st.y * (st.x + st.y)));
}

vec3 srandom3(in vec3 p) {
p = vec3( dot(p, vec3(127.1, 311.7, 74.7)),
        dot(p, vec3(269.5, 183.3, 246.1)),
        dot(p, vec3(113.5, 271.9, 124.6)));
return -1. + 2. * fract(sin(p) * 43758.5453123);
}

vec2 srandom2(in vec2 p, const in float tileLength) {
p = mod(p, vec2(tileLength));
return srandom2(p);
}

vec3 srandom3(in vec3 p, const in float tileLength) {
p = mod(p, vec3(tileLength));
return srandom3(p);
}

#endif


#ifndef FNC_CUBIC
#define FNC_CUBIC 
float cubic(const in float v) { return v*v*(3.0-2.0*v); }
vec2  cubic(const in vec2 v)  { return v*v*(3.0-2.0*v); }
vec3  cubic(const in vec3 v)  { return v*v*(3.0-2.0*v); }
vec4  cubic(const in vec4 v)  { return v*v*(3.0-2.0*v); }

float cubic(const in float value, in float slope0, in float slope1) {
float a = slope0 + slope1 - 2.;
float b = -2. * slope0 - slope1 + 3.;
float c = slope0;
float value2 = value * value;
float value3 = value * value2;
return a * value3 + b * value2 + c * value;
}

vec2 cubic(const in vec2 value, in float slope0, in float slope1) {
float a = slope0 + slope1 - 2.;
float b = -2. * slope0 - slope1 + 3.;
float c = slope0;
vec2 value2 = value * value;
vec2 value3 = value * value2;
return a * value3 + b * value2 + c * value;
}

vec3 cubic(const in vec3 value, in float slope0, in float slope1) {
float a = slope0 + slope1 - 2.;
float b = -2. * slope0 - slope1 + 3.;
float c = slope0;
vec3 value2 = value * value;
vec3 value3 = value * value2;
return a * value3 + b * value2 + c * value;
}

vec4 cubic(const in vec4 value, in float slope0, in float slope1) {
float a = slope0 + slope1 - 2.;
float b = -2. * slope0 - slope1 + 3.;
float c = slope0;
vec4 value2 = value * value;
vec4 value3 = value * value2;
return a * value3 + b * value2 + c * value;
}
#endif


#ifndef FNC_QUINTIC
#define FNC_QUINTIC 

float quintic(const in float v) { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec2  quintic(const in vec2 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec3  quintic(const in vec3 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec4  quintic(const in vec4 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }

#endif



#ifndef FNC_GNOISE
#define FNC_GNOISE

float gnoise(float x) {
float i = floor(x);  
float f = fract(x);  
return mix(random(i), random(i + 1.0), smoothstep(0.,1.,f)); 
}

float gnoise(vec2 st) {
vec2 i = floor(st);
vec2 f = fract(st);
float a = random(i);
float b = random(i + vec2(1.0, 0.0));
float c = random(i + vec2(0.0, 1.0));
float d = random(i + vec2(1.0, 1.0));
vec2 u = cubic(f);
return mix( a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float gnoise(vec3 p) {
vec3 i = floor(p);
vec3 f = fract(p);
vec3 u = quintic(f);
return -1.0 + 2.0 * mix( mix( mix( random(i + vec3(0.0,0.0,0.0)), 
                                    random(i + vec3(1.0,0.0,0.0)), u.x),
                            mix( random(i + vec3(0.0,1.0,0.0)), 
                                    random(i + vec3(1.0,1.0,0.0)), u.x), u.y),
                        mix( mix( random(i + vec3(0.0,0.0,1.0)), 
                                    random(i + vec3(1.0,0.0,1.0)), u.x),
                            mix( random(i + vec3(0.0,1.0,1.0)), 
                                    random(i + vec3(1.0,1.0,1.0)), u.x), u.y), u.z );
}

float gnoise(vec3 p, float tileLength) {
vec3 i = floor(p);
vec3 f = fract(p);
        
vec3 u = quintic(f);
    
return mix( mix( mix( dot( srandom3(i + vec3(0.0,0.0,0.0), tileLength), f - vec3(0.0,0.0,0.0)), 
                        dot( srandom3(i + vec3(1.0,0.0,0.0), tileLength), f - vec3(1.0,0.0,0.0)), u.x),
                mix( dot( srandom3(i + vec3(0.0,1.0,0.0), tileLength), f - vec3(0.0,1.0,0.0)), 
                        dot( srandom3(i + vec3(1.0,1.0,0.0), tileLength), f - vec3(1.0,1.0,0.0)), u.x), u.y),
            mix( mix( dot( srandom3(i + vec3(0.0,0.0,1.0), tileLength), f - vec3(0.0,0.0,1.0)), 
                        dot( srandom3(i + vec3(1.0,0.0,1.0), tileLength), f - vec3(1.0,0.0,1.0)), u.x),
                mix( dot( srandom3(i + vec3(0.0,1.0,1.0), tileLength), f - vec3(0.0,1.0,1.0)), 
                        dot( srandom3(i + vec3(1.0,1.0,1.0), tileLength), f - vec3(1.0,1.0,1.0)), u.x), u.y), u.z );
}

vec3 gnoise3(vec3 x) {
return vec3(gnoise(x+vec3(123.456, 0.567, 0.37)),
            gnoise(x+vec3(0.11, 47.43, 19.17)),
            gnoise(x) );
}

#endif





#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif





#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif



#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT
float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
#endif


#ifndef FNC_GRAD4
#define FNC_GRAD4
vec4 grad4(float j, vec4 ip) {
const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
vec4 p,s;

p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
s = vec4(lessThan(p, vec4(0.0)));
p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

return p;
}
#endif




#ifndef FNC_PSRFNOISE
#define FNC_PSRFNOISE

float psrdnoise(vec2 x, vec2 period, float alpha, out vec2 gradient) {


vec2 uv = vec2(x.x + x.y*0.5, x.y);


vec2 i0 = floor(uv);
vec2 f0 = fract(uv);

float cmp = step(f0.y, f0.x);
vec2 o1 = vec2(cmp, 1.0-cmp);


vec2 i1 = i0 + o1;
vec2 i2 = i0 + vec2(1.0, 1.0);


vec2 v0 = vec2(i0.x - i0.y * 0.5, i0.y);
vec2 v1 = vec2(v0.x + o1.x - o1.y * 0.5, v0.y + o1.y);
vec2 v2 = vec2(v0.x + 0.5, v0.y + 1.0);


vec2 x0 = x - v0;
vec2 x1 = x - v1;
vec2 x2 = x - v2;

vec3 iu = vec3(0.0);
vec3 iv = vec3(0.0);
vec3 xw = vec3(0.0);
vec3 yw = vec3(0.0);


if(any(greaterThan(period, vec2(0.0)))) {
    xw = vec3(v0.x, v1.x, v2.x);
    yw = vec3(v0.y, v1.y, v2.y);
    if(period.x > 0.0)
        xw = mod(vec3(v0.x, v1.x, v2.x), period.x);
    if(period.y > 0.0)
        yw = mod(vec3(v0.y, v1.y, v2.y), period.y);
    
    iu = floor(xw + 0.5*yw + 0.5);
    iv = floor(yw + 0.5);
} else { 
    iu = vec3(i0.x, i1.x, i2.x);
    iv = vec3(i0.y, i1.y, i2.y);
}


vec3 hash = mod(iu, 289.0);
hash = mod((hash*51.0 + 2.0)*hash + iv, 289.0);
hash = mod((hash*34.0 + 10.0)*hash, 289.0);


vec3 psi = hash * 0.07482 + alpha;
vec3 gx = cos(psi);
vec3 gy = sin(psi);


vec2 g0 = vec2(gx.x,gy.x);
vec2 g1 = vec2(gx.y,gy.y);
vec2 g2 = vec2(gx.z,gy.z);


vec3 w = 0.8 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2));
w = max(w, 0.0);
vec3 w2 = w * w;
vec3 w4 = w2 * w2;


vec3 gdotx = vec3(dot(g0, x0), dot(g1, x1), dot(g2, x2));


float n = dot(w4, gdotx);


vec3 w3 = w2 * w;
vec3 dw = -8.0 * w3 * gdotx;
vec2 dn0 = w4.x * g0 + dw.x * x0;
vec2 dn1 = w4.y * g1 + dw.y * x1;
vec2 dn2 = w4.z * g2 + dw.z * x2;
gradient = 10.9 * (dn0 + dn1 + dn2);


return 10.9 * n;
}

float psrdnoise(vec2 x, vec2 period, float alpha, out vec2 gradient, out vec3 dg) {


vec2 uv = vec2(x.x + x.y*0.5, x.y);


vec2 i0 = floor(uv);
vec2 f0 = fract(uv);

float cmp = step(f0.y, f0.x);
vec2 o1 = vec2(cmp, 1.0-cmp);


vec2 i1 = i0 + o1;
vec2 i2 = i0 + vec2(1.0, 1.0);


vec2 v0 = vec2(i0.x - i0.y * 0.5, i0.y);
vec2 v1 = vec2(v0.x + o1.x - o1.y * 0.5, v0.y + o1.y);
vec2 v2 = vec2(v0.x + 0.5, v0.y + 1.0);


vec2 x0 = x - v0;
vec2 x1 = x - v1;
vec2 x2 = x - v2;

vec3 iu, iv;
vec3 xw, yw;


if(any(greaterThan(period, vec2(0.0)))) {
    xw = vec3(v0.x, v1.x, v2.x);
    yw = vec3(v0.y, v1.y, v2.y);
    if(period.x > 0.0)
        xw = mod(vec3(v0.x, v1.x, v2.x), period.x);
    if(period.y > 0.0)
        yw = mod(vec3(v0.y, v1.y, v2.y), period.y);
    
    iu = floor(xw + 0.5*yw + 0.5);
    iv = floor(yw + 0.5);
} else { 
    iu = vec3(i0.x, i1.x, i2.x);
    iv = vec3(i0.y, i1.y, i2.y);
}


vec3 hash = mod(iu, 289.0);
hash = mod((hash*51.0 + 2.0)*hash + iv, 289.0);
hash = mod((hash*34.0 + 10.0)*hash, 289.0);


vec3 psi = hash * 0.07482 + alpha;
vec3 gx = cos(psi);
vec3 gy = sin(psi);


vec2 g0 = vec2(gx.x,gy.x);
vec2 g1 = vec2(gx.y,gy.y);
vec2 g2 = vec2(gx.z,gy.z);


vec3 w = 0.8 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2));
w = max(w, 0.0);
vec3 w2 = w * w;
vec3 w4 = w2 * w2;


vec3 gdotx = vec3(dot(g0, x0), dot(g1, x1), dot(g2, x2));


float n = dot(w4, gdotx);


vec3 w3 = w2 * w;
vec3 dw = -8.0 * w3 * gdotx;
vec2 dn0 = w4.x * g0 + dw.x * x0;
vec2 dn1 = w4.y * g1 + dw.y * x1;
vec2 dn2 = w4.z * g2 + dw.z * x2;
gradient = 10.9 * (dn0 + dn1 + dn2);


vec3 dg0, dg1, dg2;
vec3 dw2 = 48.0 * w2 * gdotx;

dg0.xy = dw2.x * x0 * x0 - 8.0 * w3.x * (2.0 * g0 * x0 + gdotx.x);
dg1.xy = dw2.y * x1 * x1 - 8.0 * w3.y * (2.0 * g1 * x1 + gdotx.y);
dg2.xy = dw2.z * x2 * x2 - 8.0 * w3.z * (2.0 * g2 * x2 + gdotx.z);

dg0.z = dw2.x * x0.x * x0.y - 8.0 * w3.x * dot(g0, x0.yx);
dg1.z = dw2.y * x1.x * x1.y - 8.0 * w3.y * dot(g1, x1.yx);
dg2.z = dw2.z * x2.x * x2.y - 8.0 * w3.z * dot(g2, x2.yx);
dg = 10.9 * (dg0 + dg1 + dg2);


return 10.9 * n;
}

float psrdnoise(vec2 x, vec2 period, float alpha) {
vec2 g = vec2(0.0);
return psrdnoise(x, period, alpha, g);
}

float psrdnoise(vec2 x, vec2 period) {
return psrdnoise(x, period, 0.0);
}

float psrdnoise(vec2 x) {
return psrdnoise(x, vec2(0.0));
}

float psrdnoise(vec3 x, vec3 period, float alpha, out vec3 gradient) {

#ifndef PSRDNOISE_PERLIN_GRID

const mat3 M = mat3(0.0, 1.0, 1.0,
                    1.0, 0.0, 1.0,
                    1.0, 1.0, 0.0);

const mat3 Mi = mat3(-0.5, 0.5, 0.5,
                        0.5,-0.5, 0.5,
                        0.5, 0.5,-0.5);
#endif

vec3 uvw = vec3(0.0);


#ifndef PSRDNOISE_PERLIN_GRID

uvw = M * x;
#else


uvw = x + dot(x, vec3(0.33333333));
#endif


vec3 i0 = floor(uvw);
vec3 f0 = fract(uvw); 





vec3 g_ = step(f0.xyx, f0.yzz); 
vec3 l_ = 1.0 - g_;             
vec3 g = vec3(l_.z, g_.xy);
vec3 l = vec3(l_.xy, g_.z);
vec3 o1 = min( g, l );
vec3 o2 = max( g, l );


vec3 i1 = i0 + o1;
vec3 i2 = i0 + o2;
vec3 i3 = i0 + vec3(1.0);

vec3 v0 = vec3(0.0);
vec3 v1 = vec3(0.0);
vec3 v2 = vec3(0.0);
vec3 v3 = vec3(0.0);


#ifndef PSRDNOISE_PERLIN_GRID
v0 = Mi * i0;
v1 = Mi * i1;
v2 = Mi * i2;
v3 = Mi * i3;
#else

v0 = i0 - dot(i0, vec3(1.0/6.0));
v1 = i1 - dot(i1, vec3(1.0/6.0));
v2 = i2 - dot(i2, vec3(1.0/6.0));
v3 = i3 - dot(i3, vec3(1.0/6.0));
#endif


vec3 x0 = x - v0;
vec3 x1 = x - v1;
vec3 x2 = x - v2;
vec3 x3 = x - v3;

if(any(greaterThan(period, vec3(0.0)))) {
    
    vec4 vx = vec4(v0.x, v1.x, v2.x, v3.x);
    vec4 vy = vec4(v0.y, v1.y, v2.y, v3.y);
    vec4 vz = vec4(v0.z, v1.z, v2.z, v3.z);
    
    if(period.x > 0.0) vx = mod(vx, period.x);
    if(period.y > 0.0) vy = mod(vy, period.y);
    if(period.z > 0.0) vz = mod(vz, period.z);
    
#ifndef PSRDNOISE_PERLIN_GRID
    i0 = M * vec3(vx.x, vy.x, vz.x);
    i1 = M * vec3(vx.y, vy.y, vz.y);
    i2 = M * vec3(vx.z, vy.z, vz.z);
    i3 = M * vec3(vx.w, vy.w, vz.w);
#else
    v0 = vec3(vx.x, vy.x, vz.x);
    v1 = vec3(vx.y, vy.y, vz.y);
    v2 = vec3(vx.z, vy.z, vz.z);
    v3 = vec3(vx.w, vy.w, vz.w);
    
    i0 = v0 + dot(v0, vec3(1.0/3.0));
    i1 = v1 + dot(v1, vec3(1.0/3.0));
    i2 = v2 + dot(v2, vec3(1.0/3.0));
    i3 = v3 + dot(v3, vec3(1.0/3.0));
#endif
    
    i0 = floor(i0 + 0.5);
    i1 = floor(i1 + 0.5);
    i2 = floor(i2 + 0.5);
    i3 = floor(i3 + 0.5);
}


vec4 hash = permute( permute( permute( 
            vec4(i0.z, i1.z, i2.z, i3.z ))
            + vec4(i0.y, i1.y, i2.y, i3.y ))
            + vec4(i0.x, i1.x, i2.x, i3.x ));


vec4 theta = hash * 3.883222077;  
vec4 sz    = hash * -0.006920415 + 0.996539792; 
vec4 psi   = hash * 0.108705628 ; 

vec4 Ct = cos(theta);
vec4 St = sin(theta);
vec4 sz_prime = sqrt( 1.0 - sz*sz ); 

vec4 gx = vec4(0.0);
vec4 gy = vec4(0.0);
vec4 gz = vec4(0.0);


#ifdef PSRDNOISE_FAST_ROTATION

vec4 qx = St;         
vec4 qy = -Ct; 
vec4 qz = vec4(0.0);

vec4 px =  sz * qy;   
vec4 py = -sz * qx;
vec4 pz = sz_prime;

psi += alpha;         
vec4 Sa = sin(psi);
vec4 Ca = cos(psi);

gx = Ca * px + Sa * qx;
gy = Ca * py + Sa * qy;
gz = Ca * pz + Sa * qz;
#else


if(alpha != 0.0) {
    vec4 Sp = sin(psi);          
    vec4 Cp = cos(psi);

    vec4 px = Ct * sz_prime;     
    vec4 py = St * sz_prime;     
    vec4 pz = sz;

    vec4 Ctp = St*Sp - Ct*Cp;    
    vec4 qx = mix( Ctp*St, Sp, sz);
    vec4 qy = mix(-Ctp*Ct, Cp, sz);
    vec4 qz = -(py*Cp + px*Sp);

    vec4 Sa = vec4(sin(alpha));       
    vec4 Ca = vec4(cos(alpha));

    gx = Ca * px + Sa * qx;
    gy = Ca * py + Sa * qy;
    gz = Ca * pz + Sa * qz;
}
else {
    gx = Ct * sz_prime;  
    gy = St * sz_prime;
    gz = sz;  
}
#endif


vec3 g0 = vec3(gx.x, gy.x, gz.x);
vec3 g1 = vec3(gx.y, gy.y, gz.y);
vec3 g2 = vec3(gx.z, gy.z, gz.z);
vec3 g3 = vec3(gx.w, gy.w, gz.w);


vec4 w = 0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3));
w = max(w, 0.0);
vec4 w2 = w * w;
vec4 w3 = w2 * w;


vec4 gdotx = vec4(dot(g0,x0), dot(g1,x1), dot(g2,x2), dot(g3,x3));


float n = dot(w3, gdotx);


vec4 dw = -6.0 * w2 * gdotx;
vec3 dn0 = w3.x * g0 + dw.x * x0;
vec3 dn1 = w3.y * g1 + dw.y * x1;
vec3 dn2 = w3.z * g2 + dw.z * x2;
vec3 dn3 = w3.w * g3 + dw.w * x3;
gradient = 39.5 * (dn0 + dn1 + dn2 + dn3);


return 39.5 * n;

}

float psrdnoise(vec3 x, vec3 period, float alpha, out vec3 gradient, out vec3 dg, out vec3 dg2) {

#ifndef PSRDNOISE_PERLIN_GRID

const mat3 M = mat3(0.0, 1.0, 1.0,
                    1.0, 0.0, 1.0,
                    1.0, 1.0, 0.0);

const mat3 Mi = mat3(-0.5, 0.5, 0.5,
                        0.5,-0.5, 0.5,
                        0.5, 0.5,-0.5);
#endif

vec3 uvw = vec3(0.0);


#ifndef PSRDNOISE_PERLIN_GRID

uvw = M * x;
#else


uvw = x + dot(x, vec3(0.3333333));
#endif


vec3 i0 = floor(uvw);
vec3 f0 = fract(uvw); 





vec3 g_ = step(f0.xyx, f0.yzz); 
vec3 l_ = 1.0 - g_;             
vec3 g = vec3(l_.z, g_.xy);
vec3 l = vec3(l_.xy, g_.z);
vec3 o1 = min( g, l );
vec3 o2 = max( g, l );


vec3 i1 = i0 + o1;
vec3 i2 = i0 + o2;
vec3 i3 = i0 + vec3(1.0);

vec3 v0, v1, v2, v3;


#ifndef PSRDNOISE_PERLIN_GRID
v0 = Mi * i0;
v1 = Mi * i1;
v2 = Mi * i2;
v3 = Mi * i3;
#else

v0 = i0 - dot(i0, vec3(1.0/6.0));
v1 = i1 - dot(i1, vec3(1.0/6.0));
v2 = i2 - dot(i2, vec3(1.0/6.0));
v3 = i3 - dot(i3, vec3(1.0/6.0));
#endif


vec3 x0 = x - v0;
vec3 x1 = x - v1;
vec3 x2 = x - v2;
vec3 x3 = x - v3;

if(any(greaterThan(period, vec3(0.0)))) {
    
    vec4 vx = vec4(v0.x, v1.x, v2.x, v3.x);
    vec4 vy = vec4(v0.y, v1.y, v2.y, v3.y);
    vec4 vz = vec4(v0.z, v1.z, v2.z, v3.z);
    
    if(period.x > 0.0) vx = mod(vx, period.x);
    if(period.y > 0.0) vy = mod(vy, period.y);
    if(period.z > 0.0) vz = mod(vz, period.z);
    
#ifndef PSRDNOISE_PERLIN_GRID
    i0 = M * vec3(vx.x, vy.x, vz.x);
    i1 = M * vec3(vx.y, vy.y, vz.y);
    i2 = M * vec3(vx.z, vy.z, vz.z);
    i3 = M * vec3(vx.w, vy.w, vz.w);
#else
    v0 = vec3(vx.x, vy.x, vz.x);
    v1 = vec3(vx.y, vy.y, vz.y);
    v2 = vec3(vx.z, vy.z, vz.z);
    v3 = vec3(vx.w, vy.w, vz.w);
    
    i0 = v0 + dot(v0, vec3(0.3333333));
    i1 = v1 + dot(v1, vec3(0.3333333));
    i2 = v2 + dot(v2, vec3(0.3333333));
    i3 = v3 + dot(v3, vec3(0.3333333));
#endif
    
    i0 = floor(i0 + 0.5);
    i1 = floor(i1 + 0.5);
    i2 = floor(i2 + 0.5);
    i3 = floor(i3 + 0.5);
}


vec4 hash = permute( permute( permute( 
            vec4(i0.z, i1.z, i2.z, i3.z ))
            + vec4(i0.y, i1.y, i2.y, i3.y ))
            + vec4(i0.x, i1.x, i2.x, i3.x ));


vec4 theta = hash * 3.883222077;  
vec4 sz    = hash * -0.006920415 + 0.996539792; 
vec4 psi   = hash * 0.108705628 ; 

vec4 Ct = cos(theta);
vec4 St = sin(theta);
vec4 sz_prime = sqrt( 1.0 - sz*sz ); 

vec4 gx, gy, gz;


#ifdef PSRDNOISE_FAST_ROTATION

vec4 qx = St;         
vec4 qy = -Ct; 
vec4 qz = vec4(0.0);

vec4 px =  sz * qy;   
vec4 py = -sz * qx;
vec4 pz = sz_prime;

psi += alpha;         
vec4 Sa = sin(psi);
vec4 Ca = cos(psi);

gx = Ca * px + Sa * qx;
gy = Ca * py + Sa * qy;
gz = Ca * pz + Sa * qz;
#else


if(alpha != 0.0) {
    vec4 Sp = sin(psi);          
    vec4 Cp = cos(psi);

    vec4 px = Ct * sz_prime;     
    vec4 py = St * sz_prime;     
    vec4 pz = sz;

    vec4 Ctp = St*Sp - Ct*Cp;    
    vec4 qx = mix( Ctp*St, Sp, sz);
    vec4 qy = mix(-Ctp*Ct, Cp, sz);
    vec4 qz = -(py*Cp + px*Sp);

    vec4 Sa = vec4(sin(alpha));       
    vec4 Ca = vec4(cos(alpha));

    gx = Ca * px + Sa * qx;
    gy = Ca * py + Sa * qy;
    gz = Ca * pz + Sa * qz;
}
else {
    gx = Ct * sz_prime;  
    gy = St * sz_prime;
    gz = sz;  
}
#endif


vec3 g0 = vec3(gx.x, gy.x, gz.x);
vec3 g1 = vec3(gx.y, gy.y, gz.y);
vec3 g2 = vec3(gx.z, gy.z, gz.z);
vec3 g3 = vec3(gx.w, gy.w, gz.w);


vec4 w = 0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3));
w = max(w, 0.0);
vec4 w2 = w * w;
vec4 w3 = w2 * w;


vec4 gdotx = vec4(dot(g0,x0), dot(g1,x1), dot(g2,x2), dot(g3,x3));


float n = dot(w3, gdotx);


vec4 dw = -6.0 * w2 * gdotx;
vec3 dn0 = w3.x * g0 + dw.x * x0;
vec3 dn1 = w3.y * g1 + dw.y * x1;
vec3 dn2 = w3.z * g2 + dw.z * x2;
vec3 dn3 = w3.w * g3 + dw.w * x3;
gradient = 39.5 * (dn0 + dn1 + dn2 + dn3);


vec4 dw2 = 24.0 * w * gdotx;
vec3 dga0 = dw2.x * x0 * x0 - 6.0 * w2.x * (gdotx.x + 2.0 * g0 * x0);
vec3 dga1 = dw2.y * x1 * x1 - 6.0 * w2.y * (gdotx.y + 2.0 * g1 * x1);
vec3 dga2 = dw2.z * x2 * x2 - 6.0 * w2.z * (gdotx.z + 2.0 * g2 * x2);
vec3 dga3 = dw2.w * x3 * x3 - 6.0 * w2.w * (gdotx.w + 2.0 * g3 * x3);
dg = 35.0 * (dga0 + dga1 + dga2 + dga3); 
vec3 dgb0 = dw2.x * x0 * x0.yzx - 6.0 * w2.x * (g0 * x0.yzx + g0.yzx * x0);
vec3 dgb1 = dw2.y * x1 * x1.yzx - 6.0 * w2.y * (g1 * x1.yzx + g1.yzx * x1);
vec3 dgb2 = dw2.z * x2 * x2.yzx - 6.0 * w2.z * (g2 * x2.yzx + g2.yzx * x2);
vec3 dgb3 = dw2.w * x3 * x3.yzx - 6.0 * w2.w * (g3 * x3.yzx + g3.yzx * x3);
dg2 = 39.5 * (dgb0 + dgb1 + dgb2 + dgb3); 


return 39.5 * n;
}

float psrdnoise(vec3 x, vec3 period, float alpha) {
vec3 g = vec3(0.0);
return psrdnoise(x, period, alpha, g);
}

float psrdnoise(vec3 x, vec3 period) {
return psrdnoise(x, period, 0.0);
}

float psrdnoise(vec3 x) {
return psrdnoise(x, vec3(0.0));
}
#endif





#ifndef RANDOM_SCALE
#if defined(RANDOM_HIGHER_RANGE)
#define RANDOM_SCALE vec4(.1031, .1030, .0973, .1099)
#else
#define RANDOM_SCALE vec4(443.897, 441.423, .0973, .1099)
#endif
#endif

#ifndef FNC_RANDOM
#define FNC_RANDOM
float random(in float x) {
#if defined(RANDOM_SINLESS)
x = fract(x * RANDOM_SCALE.x);
x *= x + 33.33;
x *= x + x;
return fract(x);
#else
return fract(sin(x) * 43758.5453);
#endif
}

float random(in vec2 st) {
#if defined(RANDOM_SINLESS)
vec3 p3  = fract(vec3(st.xyx) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 33.33);
return fract((p3.x + p3.y) * p3.z);
#else
return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
#endif
}

float random(in vec3 pos) {
#if defined(RANDOM_SINLESS)
pos  = fract(pos * RANDOM_SCALE.xyz);
pos += dot(pos, pos.zyx + 31.32);
return fract((pos.x + pos.y) * pos.z);
#else
return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
#endif
}

float random(in vec4 pos) {
#if defined(RANDOM_SINLESS)
pos = fract(pos * RANDOM_SCALE);
pos += dot(pos, pos.wzxy+33.33);
return fract((pos.x + pos.y) * (pos.z + pos.w));
#else
float dot_product = dot(pos, vec4(12.9898,78.233,45.164,94.673));
return fract(sin(dot_product) * 43758.5453);
#endif
}

vec2 random2(float p) {
vec3 p3 = fract(vec3(p) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xx + p3.yz) * p3.zy);
}

vec2 random2(vec2 p) {
vec3 p3 = fract(p.xyx * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xx + p3.yz) * p3.zy);
}

vec2 random2(vec3 p3) {
p3 = fract(p3 * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xx + p3.yz) * p3.zy);
}

vec3 random3(float p) {
vec3 p3 = fract(vec3(p) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xxy + p3.yzz) * p3.zyx); 
}

vec3 random3(vec2 p) {
vec3 p3 = fract(vec3(p.xyx) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yxz + 19.19);
return fract((p3.xxy + p3.yzz) * p3.zyx);
}

vec3 random3(vec3 p) {
p = fract(p * RANDOM_SCALE.xyz);
p += dot(p, p.yxz + 19.19);
return fract((p.xxy + p.yzz) * p.zyx);
}

vec4 random4(float p) {
vec4 p4 = fract(p * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);   
}

vec4 random4(vec2 p) {
vec4 p4 = fract(p.xyxy * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

vec4 random4(vec3 p) {
vec4 p4 = fract(p.xyzx  * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

vec4 random4(vec4 p4) {
p4 = fract(p4  * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}


#endif




#ifndef FNC_WORLEY
#define FNC_WORLEY

float worley(vec2 p){
vec2 n = floor( p );
vec2 f = fract( p );

float dis = 1.0;
for( int j= -1; j <= 1; j++ )
    for( int i=-1; i <= 1; i++ ) {	
            vec2  g = vec2(i,j);
            vec2  o = random2( n + g );
            vec2  delta = g + o - f;
            float d = length(delta);
            dis = min(dis,d);
}

return 1.0-dis;
}

float worley(vec3 p) {
vec3 n = floor( p );
vec3 f = fract( p );

float dis = 1.0;
for( int k = -1; k <= 1; k++ )
    for( int j= -1; j <= 1; j++ )
        for( int i=-1; i <= 1; i++ ) {	
            vec3  g = vec3(i,j,k);
            vec3  o = random3( n + g );
            vec3  delta = g+o-f;
            float d = length(delta);
            dis = min(dis,d);
}

return 1.0-dis;
}

#endif





#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif





#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif



#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT
float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
#endif


#ifndef FNC_GRAD4
#define FNC_GRAD4
vec4 grad4(float j, vec4 ip) {
const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
vec4 p,s;

p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
s = vec4(lessThan(p, vec4(0.0)));
p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

return p;
}
#endif




#ifndef FNC_SNOISE
#define FNC_SNOISE
float snoise(in vec2 v) {
const vec4 C = vec4(0.211324865405187,  
                    0.366025403784439,  
                    -0.577350269189626,  
                    0.024390243902439); 

vec2 i  = floor(v + dot(v, C.yy) );
vec2 x0 = v -   i + dot(i, C.xx);


vec2 i1;


i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);



vec4 x12 = x0.xyxy + C.xxzz;
x12.xy -= i1;


i = mod289(i); 
vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
+ i.x + vec3(0.0, i1.x, 1.0 ));

vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
m = m*m ;
m = m*m ;




vec3 x = 2.0 * fract(p * C.www) - 1.0;
vec3 h = abs(x) - 0.5;
vec3 ox = floor(x + 0.5);
vec3 a0 = x - ox;



m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );


vec3 g;
g.x  = a0.x  * x0.x  + h.x  * x0.y;
g.yz = a0.yz * x12.xz + h.yz * x12.yw;
return 130.0 * dot(m, g);
}


float snoise(in vec3 v) {
const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);


vec3 i  = floor(v + dot(v, C.yyy) );
vec3 x0 =   v - i + dot(i, C.xxx) ;


vec3 g = step(x0.yzx, x0.xyz);
vec3 l = 1.0 - g;
vec3 i1 = min( g.xyz, l.zxy );
vec3 i2 = max( g.xyz, l.zxy );





vec3 x1 = x0 - i1 + C.xxx;
vec3 x2 = x0 - i2 + C.yyy; 
vec3 x3 = x0 - D.yyy;      


i = mod289(i);
vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));



float n_ = 0.142857142857; 
vec3  ns = n_ * D.wyz - D.xzx;

vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  

vec4 x_ = floor(j * ns.z);
vec4 y_ = floor(j - 7.0 * x_ );    

vec4 x = x_ *ns.x + ns.yyyy;
vec4 y = y_ *ns.x + ns.yyyy;
vec4 h = 1.0 - abs(x) - abs(y);

vec4 b0 = vec4( x.xy, y.xy );
vec4 b1 = vec4( x.zw, y.zw );



vec4 s0 = floor(b0)*2.0 + 1.0;
vec4 s1 = floor(b1)*2.0 + 1.0;
vec4 sh = -step(h, vec4(0.0));

vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

vec3 p0 = vec3(a0.xy,h.x);
vec3 p1 = vec3(a0.zw,h.y);
vec3 p2 = vec3(a1.xy,h.z);
vec3 p3 = vec3(a1.zw,h.w);


vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
p0 *= norm.x;
p1 *= norm.y;
p2 *= norm.z;
p3 *= norm.w;


vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
m = m * m;
return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                            dot(p2,x2), dot(p3,x3) ) );
}

float snoise(in vec4 v) {
const vec4  C = vec4( 0.138196601125011,  
                    0.276393202250021,  
                    0.414589803375032,  
                    -0.447213595499958); 


vec4 i  = floor(v + dot(v, vec4(.309016994374947451)) ); 
vec4 x0 = v -   i + dot(i, C.xxxx);




vec4 i0;
vec3 isX = step( x0.yzw, x0.xxx );
vec3 isYZ = step( x0.zww, x0.yyz );

i0.x = isX.x + isX.y + isX.z;
i0.yzw = 1.0 - isX;

i0.y += isYZ.x + isYZ.y;
i0.zw += 1.0 - isYZ.xy;
i0.z += isYZ.z;
i0.w += 1.0 - isYZ.z;


vec4 i3 = clamp( i0, 0.0, 1.0 );
vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );






vec4 x1 = x0 - i1 + C.xxxx;
vec4 x2 = x0 - i2 + C.yyyy;
vec4 x3 = x0 - i3 + C.zzzz;
vec4 x4 = x0 + C.wwww;


i = mod289(i);
float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
vec4 j1 = permute( permute( permute( permute (
            i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
        + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
        + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
        + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));



vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

vec4 p0 = grad4(j0,   ip);
vec4 p1 = grad4(j1.x, ip);
vec4 p2 = grad4(j1.y, ip);
vec4 p3 = grad4(j1.z, ip);
vec4 p4 = grad4(j1.w, ip);


vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
p0 *= norm.x;
p1 *= norm.y;
p2 *= norm.z;
p3 *= norm.w;
p4 *= taylorInvSqrt(dot(p4,p4));


vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
m0 = m0 * m0;
m1 = m1 * m1;
return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
            + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}

vec2 snoise2( vec2 x ){
float s  = snoise(vec2( x ));
float s1 = snoise(vec2( x.y - 19.1, x.x + 47.2 ));
return vec2( s , s1 );
}

vec3 snoise3( vec3 x ){
float s  = snoise(vec3( x ));
float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
return vec3( s , s1 , s2 );
}

vec3 snoise3( vec4 x ){
float s  = snoise(vec4( x ));
float s1 = snoise(vec4( x.y - 19.1 , x.z + 33.4 , x.x + 47.2, x.w ));
float s2 = snoise(vec4( x.z + 74.2 , x.x - 124.5 , x.y + 99.4, x.w ));
return vec3( s , s1 , s2 );
}

#endif






#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif





#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif



#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT
float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
#endif


#ifndef FNC_GRAD4
#define FNC_GRAD4
vec4 grad4(float j, vec4 ip) {
const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
vec4 p,s;

p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
s = vec4(lessThan(p, vec4(0.0)));
p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

return p;
}
#endif




#ifndef FNC_SNOISE
#define FNC_SNOISE
float snoise(in vec2 v) {
const vec4 C = vec4(0.211324865405187,  
                    0.366025403784439,  
                    -0.577350269189626,  
                    0.024390243902439); 

vec2 i  = floor(v + dot(v, C.yy) );
vec2 x0 = v -   i + dot(i, C.xx);


vec2 i1;


i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);



vec4 x12 = x0.xyxy + C.xxzz;
x12.xy -= i1;


i = mod289(i); 
vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
+ i.x + vec3(0.0, i1.x, 1.0 ));

vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
m = m*m ;
m = m*m ;




vec3 x = 2.0 * fract(p * C.www) - 1.0;
vec3 h = abs(x) - 0.5;
vec3 ox = floor(x + 0.5);
vec3 a0 = x - ox;



m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );


vec3 g;
g.x  = a0.x  * x0.x  + h.x  * x0.y;
g.yz = a0.yz * x12.xz + h.yz * x12.yw;
return 130.0 * dot(m, g);
}


float snoise(in vec3 v) {
const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);


vec3 i  = floor(v + dot(v, C.yyy) );
vec3 x0 =   v - i + dot(i, C.xxx) ;


vec3 g = step(x0.yzx, x0.xyz);
vec3 l = 1.0 - g;
vec3 i1 = min( g.xyz, l.zxy );
vec3 i2 = max( g.xyz, l.zxy );





vec3 x1 = x0 - i1 + C.xxx;
vec3 x2 = x0 - i2 + C.yyy; 
vec3 x3 = x0 - D.yyy;      


i = mod289(i);
vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));



float n_ = 0.142857142857; 
vec3  ns = n_ * D.wyz - D.xzx;

vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  

vec4 x_ = floor(j * ns.z);
vec4 y_ = floor(j - 7.0 * x_ );    

vec4 x = x_ *ns.x + ns.yyyy;
vec4 y = y_ *ns.x + ns.yyyy;
vec4 h = 1.0 - abs(x) - abs(y);

vec4 b0 = vec4( x.xy, y.xy );
vec4 b1 = vec4( x.zw, y.zw );



vec4 s0 = floor(b0)*2.0 + 1.0;
vec4 s1 = floor(b1)*2.0 + 1.0;
vec4 sh = -step(h, vec4(0.0));

vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

vec3 p0 = vec3(a0.xy,h.x);
vec3 p1 = vec3(a0.zw,h.y);
vec3 p2 = vec3(a1.xy,h.z);
vec3 p3 = vec3(a1.zw,h.w);


vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
p0 *= norm.x;
p1 *= norm.y;
p2 *= norm.z;
p3 *= norm.w;


vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
m = m * m;
return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                            dot(p2,x2), dot(p3,x3) ) );
}

float snoise(in vec4 v) {
const vec4  C = vec4( 0.138196601125011,  
                    0.276393202250021,  
                    0.414589803375032,  
                    -0.447213595499958); 


vec4 i  = floor(v + dot(v, vec4(.309016994374947451)) ); 
vec4 x0 = v -   i + dot(i, C.xxxx);




vec4 i0;
vec3 isX = step( x0.yzw, x0.xxx );
vec3 isYZ = step( x0.zww, x0.yyz );

i0.x = isX.x + isX.y + isX.z;
i0.yzw = 1.0 - isX;

i0.y += isYZ.x + isYZ.y;
i0.zw += 1.0 - isYZ.xy;
i0.z += isYZ.z;
i0.w += 1.0 - isYZ.z;


vec4 i3 = clamp( i0, 0.0, 1.0 );
vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );






vec4 x1 = x0 - i1 + C.xxxx;
vec4 x2 = x0 - i2 + C.yyyy;
vec4 x3 = x0 - i3 + C.zzzz;
vec4 x4 = x0 + C.wwww;


i = mod289(i);
float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
vec4 j1 = permute( permute( permute( permute (
            i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
        + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
        + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
        + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));



vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

vec4 p0 = grad4(j0,   ip);
vec4 p1 = grad4(j1.x, ip);
vec4 p2 = grad4(j1.y, ip);
vec4 p3 = grad4(j1.z, ip);
vec4 p4 = grad4(j1.w, ip);


vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
p0 *= norm.x;
p1 *= norm.y;
p2 *= norm.z;
p3 *= norm.w;
p4 *= taylorInvSqrt(dot(p4,p4));


vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
m0 = m0 * m0;
m1 = m1 * m1;
return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
            + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}

vec2 snoise2( vec2 x ){
float s  = snoise(vec2( x ));
float s1 = snoise(vec2( x.y - 19.1, x.x + 47.2 ));
return vec2( s , s1 );
}

vec3 snoise3( vec3 x ){
float s  = snoise(vec3( x ));
float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
return vec3( s , s1 , s2 );
}

vec3 snoise3( vec4 x ){
float s  = snoise(vec4( x ));
float s1 = snoise(vec4( x.y - 19.1 , x.z + 33.4 , x.x + 47.2, x.w ));
float s2 = snoise(vec4( x.z + 74.2 , x.x - 124.5 , x.y + 99.4, x.w ));
return vec3( s , s1 , s2 );
}

#endif



#ifndef RANDOM_SCALE
#if defined(RANDOM_HIGHER_RANGE)
#define RANDOM_SCALE vec4(.1031, .1030, .0973, .1099)
#else
#define RANDOM_SCALE vec4(443.897, 441.423, .0973, .1099)
#endif
#endif

#ifndef FNC_RANDOM
#define FNC_RANDOM
float random(in float x) {
#if defined(RANDOM_SINLESS)
x = fract(x * RANDOM_SCALE.x);
x *= x + 33.33;
x *= x + x;
return fract(x);
#else
return fract(sin(x) * 43758.5453);
#endif
}

float random(in vec2 st) {
#if defined(RANDOM_SINLESS)
vec3 p3  = fract(vec3(st.xyx) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 33.33);
return fract((p3.x + p3.y) * p3.z);
#else
return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
#endif
}

float random(in vec3 pos) {
#if defined(RANDOM_SINLESS)
pos  = fract(pos * RANDOM_SCALE.xyz);
pos += dot(pos, pos.zyx + 31.32);
return fract((pos.x + pos.y) * pos.z);
#else
return fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
#endif
}

float random(in vec4 pos) {
#if defined(RANDOM_SINLESS)
pos = fract(pos * RANDOM_SCALE);
pos += dot(pos, pos.wzxy+33.33);
return fract((pos.x + pos.y) * (pos.z + pos.w));
#else
float dot_product = dot(pos, vec4(12.9898,78.233,45.164,94.673));
return fract(sin(dot_product) * 43758.5453);
#endif
}

vec2 random2(float p) {
vec3 p3 = fract(vec3(p) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xx + p3.yz) * p3.zy);
}

vec2 random2(vec2 p) {
vec3 p3 = fract(p.xyx * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xx + p3.yz) * p3.zy);
}

vec2 random2(vec3 p3) {
p3 = fract(p3 * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xx + p3.yz) * p3.zy);
}

vec3 random3(float p) {
vec3 p3 = fract(vec3(p) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yzx + 19.19);
return fract((p3.xxy + p3.yzz) * p3.zyx); 
}

vec3 random3(vec2 p) {
vec3 p3 = fract(vec3(p.xyx) * RANDOM_SCALE.xyz);
p3 += dot(p3, p3.yxz + 19.19);
return fract((p3.xxy + p3.yzz) * p3.zyx);
}

vec3 random3(vec3 p) {
p = fract(p * RANDOM_SCALE.xyz);
p += dot(p, p.yxz + 19.19);
return fract((p.xxy + p.yzz) * p.zyx);
}

vec4 random4(float p) {
vec4 p4 = fract(p * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);   
}

vec4 random4(vec2 p) {
vec4 p4 = fract(p.xyxy * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

vec4 random4(vec3 p) {
vec4 p4 = fract(p.xyzx  * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}

vec4 random4(vec4 p4) {
p4 = fract(p4  * RANDOM_SCALE);
p4 += dot(p4, p4.wzxy + 19.19);
return fract((p4.xxyz + p4.yzzw) * p4.zywx);
}


#endif



#ifndef FNC_SRANDOM
#define FNC_SRANDOM

float srandom(in float x) {
return -1. + 2. * fract(sin(x) * 43758.5453);
}

float srandom(in vec2 st) {
return -1. + 2. * fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float srandom(in vec3 pos) {
return -1. + 2. * fract(sin(dot(pos.xyz, vec3(70.9898, 78.233, 32.4355))) * 43758.5453123);
}

float srandom(in vec4 pos) {
float dot_product = dot(pos, vec4(12.9898,78.233,45.164,94.673));
return -1. + 2. * fract(sin(dot_product) * 43758.5453);
}

vec2 srandom2(in vec2 st) {
const vec2 k = vec2(.3183099, .3678794);
st = st * k + k.yx;
return -1. + 2. * fract(16. * k * fract(st.x * st.y * (st.x + st.y)));
}

vec3 srandom3(in vec3 p) {
p = vec3( dot(p, vec3(127.1, 311.7, 74.7)),
        dot(p, vec3(269.5, 183.3, 246.1)),
        dot(p, vec3(113.5, 271.9, 124.6)));
return -1. + 2. * fract(sin(p) * 43758.5453123);
}

vec2 srandom2(in vec2 p, const in float tileLength) {
p = mod(p, vec2(tileLength));
return srandom2(p);
}

vec3 srandom3(in vec3 p, const in float tileLength) {
p = mod(p, vec3(tileLength));
return srandom3(p);
}

#endif


#ifndef FNC_CUBIC
#define FNC_CUBIC 
float cubic(const in float v) { return v*v*(3.0-2.0*v); }
vec2  cubic(const in vec2 v)  { return v*v*(3.0-2.0*v); }
vec3  cubic(const in vec3 v)  { return v*v*(3.0-2.0*v); }
vec4  cubic(const in vec4 v)  { return v*v*(3.0-2.0*v); }

float cubic(const in float value, in float slope0, in float slope1) {
float a = slope0 + slope1 - 2.;
float b = -2. * slope0 - slope1 + 3.;
float c = slope0;
float value2 = value * value;
float value3 = value * value2;
return a * value3 + b * value2 + c * value;
}

vec2 cubic(const in vec2 value, in float slope0, in float slope1) {
    float a = slope0 + slope1 - 2.;
    float b = -2. * slope0 - slope1 + 3.;
    float c = slope0;
    vec2 value2 = value * value;
    vec2 value3 = value * value2;
    return a * value3 + b * value2 + c * value;
}

vec3 cubic(const in vec3 value, in float slope0, in float slope1) {
    float a = slope0 + slope1 - 2.;
    float b = -2. * slope0 - slope1 + 3.;
    float c = slope0;
    vec3 value2 = value * value;
    vec3 value3 = value * value2;
    return a * value3 + b * value2 + c * value;
}

vec4 cubic(const in vec4 value, in float slope0, in float slope1) {
    float a = slope0 + slope1 - 2.;
    float b = -2. * slope0 - slope1 + 3.;
    float c = slope0;
    vec4 value2 = value * value;
    vec4 value3 = value * value2;
    return a * value3 + b * value2 + c * value;
}
#endif


#ifndef FNC_QUINTIC
#define FNC_QUINTIC 

float quintic(const in float v) { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec2  quintic(const in vec2 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec3  quintic(const in vec3 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec4  quintic(const in vec4 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }

#endif



#ifndef FNC_GNOISE
#define FNC_GNOISE

float gnoise(float x) {
    float i = floor(x);  
    float f = fract(x);  
    return mix(random(i), random(i + 1.0), smoothstep(0.,1.,f)); 
}

float gnoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = cubic(f);
    return mix( a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
}

float gnoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = quintic(f);
    return -1.0 + 2.0 * mix( mix( mix( random(i + vec3(0.0,0.0,0.0)), 
                                        random(i + vec3(1.0,0.0,0.0)), u.x),
                                mix( random(i + vec3(0.0,1.0,0.0)), 
                                        random(i + vec3(1.0,1.0,0.0)), u.x), u.y),
                            mix( mix( random(i + vec3(0.0,0.0,1.0)), 
                                        random(i + vec3(1.0,0.0,1.0)), u.x),
                                mix( random(i + vec3(0.0,1.0,1.0)), 
                                        random(i + vec3(1.0,1.0,1.0)), u.x), u.y), u.z );
}

float gnoise(vec3 p, float tileLength) {
    vec3 i = floor(p);
    vec3 f = fract(p);
            
    vec3 u = quintic(f);
        
    return mix( mix( mix( dot( srandom3(i + vec3(0.0,0.0,0.0), tileLength), f - vec3(0.0,0.0,0.0)), 
                            dot( srandom3(i + vec3(1.0,0.0,0.0), tileLength), f - vec3(1.0,0.0,0.0)), u.x),
                    mix( dot( srandom3(i + vec3(0.0,1.0,0.0), tileLength), f - vec3(0.0,1.0,0.0)), 
                            dot( srandom3(i + vec3(1.0,1.0,0.0), tileLength), f - vec3(1.0,1.0,0.0)), u.x), u.y),
                mix( mix( dot( srandom3(i + vec3(0.0,0.0,1.0), tileLength), f - vec3(0.0,0.0,1.0)), 
                            dot( srandom3(i + vec3(1.0,0.0,1.0), tileLength), f - vec3(1.0,0.0,1.0)), u.x),
                    mix( dot( srandom3(i + vec3(0.0,1.0,1.0), tileLength), f - vec3(0.0,1.0,1.0)), 
                            dot( srandom3(i + vec3(1.0,1.0,1.0), tileLength), f - vec3(1.0,1.0,1.0)), u.x), u.y), u.z );
}

vec3 gnoise3(vec3 x) {
    return vec3(gnoise(x+vec3(123.456, 0.567, 0.37)),
                gnoise(x+vec3(0.11, 47.43, 19.17)),
                gnoise(x) );
}

#endif




#ifndef FBM_OCTAVES
#define FBM_OCTAVES 4
#endif

#ifndef FBM_NOISE_FNC
#define FBM_NOISE_FNC(UV) snoise(UV)
#endif

#ifndef FBM_NOISE2_FNC
#define FBM_NOISE2_FNC(UV) FBM_NOISE_FNC(UV)
#endif

#ifndef FBM_NOISE3_FNC
#define FBM_NOISE3_FNC(UV) FBM_NOISE_FNC(UV)
#endif

#ifndef FBM_NOISE_TILABLE_FNC
#define FBM_NOISE_TILABLE_FNC(UV, TILE) gnoise(UV, TILE)
#endif

#ifndef FBM_NOISE3_TILABLE_FNC
#define FBM_NOISE3_TILABLE_FNC(UV, TILE) FBM_NOISE_TILABLE_FNC(UV, TILE)
#endif

#ifndef FBM_NOISE_TYPE
#define FBM_NOISE_TYPE float
#endif

#ifndef FBM_VALUE_INITIAL
#define FBM_VALUE_INITIAL 0.0
#endif

#ifndef FBM_SCALE_SCALAR
#define FBM_SCALE_SCALAR 2.0
#endif

#ifndef FBM_AMPLITUD_INITIAL
#define FBM_AMPLITUD_INITIAL 0.5
#endif

#ifndef FBM_AMPLITUD_SCALAR
#define FBM_AMPLITUD_SCALAR 0.5
#endif

#ifndef FNC_FBM
#define FNC_FBM
FBM_NOISE_TYPE fbm(in vec2 st) {
    FBM_NOISE_TYPE value = FBM_NOISE_TYPE(FBM_VALUE_INITIAL);
    float amplitud = FBM_AMPLITUD_INITIAL;


    for (int i = 0; i < FBM_OCTAVES; i++) {
        value += amplitud * FBM_NOISE2_FNC(st);
        st *= FBM_SCALE_SCALAR;
        amplitud *= FBM_AMPLITUD_SCALAR;
    }
    return value;
}

FBM_NOISE_TYPE fbm(in vec3 pos) {
    FBM_NOISE_TYPE value = FBM_NOISE_TYPE(FBM_VALUE_INITIAL);
    float amplitud = FBM_AMPLITUD_INITIAL;

    for (int i = 0; i < FBM_OCTAVES; i++) {
        value += amplitud * FBM_NOISE3_FNC(pos);
        pos *= FBM_SCALE_SCALAR;
        amplitud *= FBM_AMPLITUD_SCALAR;
    }
    return value;
}

FBM_NOISE_TYPE fbm(vec3 p, float tileLength) {
    const float persistence = 0.5;
    const float lacunarity = 2.0;

    float amplitude = 0.5;
    FBM_NOISE_TYPE total = FBM_NOISE_TYPE(0.0);
    float normalization = 0.0;

    for (int i = 0; i < FBM_OCTAVES; ++i) {
        float noiseValue = FBM_NOISE3_TILABLE_FNC(p, tileLength * lacunarity * 0.5) * 0.5 + 0.5;
        total += noiseValue * amplitude;
        normalization += amplitude;
        amplitude *= persistence;
        p = p * lacunarity;
    }

    return total / normalization;
}
#endif

void main() {
    vUv = uv;

    pos = position;

    vDisplacement = cnoise(position*(0.0 + 1.0/u_scale) + vec3(u_time*u_speed));

    float frequency = 4.0;
    float stripes = frequency * position.y;
    float rounded = floor(stripes);

    if (mod(rounded, 2.0) == 0.0){
        vDisplacement *= 2.2;
    }

    vec3 newPosition = position + normal * vDisplacement*u_intensity;
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}`