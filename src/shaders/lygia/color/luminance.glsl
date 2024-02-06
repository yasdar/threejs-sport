/*
function: luminance
description: Computes the luminance of the specified linear RGB color using the luminance coefficients from Rec. 709.
use: luminance(<vec3|vec4> color)
*/

#ifndef FNC_LUMINANCE
#define FNC_LUMINANCE
float luminance(in vec3 linear) { return dot(linear, vec3(0.2126, 0.7152, 0.0722)); }
float luminance(in vec4 linear) { return luminance( linear.rgb ); }
#endif