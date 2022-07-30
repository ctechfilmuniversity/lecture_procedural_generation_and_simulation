#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    ofSetWindowShape(N*SCALE + 270, N*SCALE);
    gui->addButton("Reset");
    gui->addSlider("Viscosity", 0.0, 2.0, fluid.viscosity/0.0001);
    gui->addSlider("Diffusion", 0.0, 2.0, fluid.diffusion/0.0001);
    gui->addSlider("Time step", 0.0, 2.0, fluid.lengthOfTimestep/0.1);
    gui->addSlider("Fade", 0.0, 1.0, 0.0);
    gui->addToggle("Color Gradient", false);
    gui->addToggle("Noise", false);
    gui->addToggle("Flow Field", false);
    ofxDatGuiSlider* viscositySlider = gui->getSlider("Viscosity");
    viscositySlider->setPrecision(3);
    ofxDatGuiSlider* diffusionSlider = gui->getSlider("Diffusion");
    diffusionSlider->setPrecision(3);
    gui->onButtonEvent(this, &ofApp::onButtonEvent);
    gui->onSliderEvent(this, &ofApp::onSliderEvent);
    gui->onToggleEvent(this, &ofApp::onToggleEvent);
}

void ofApp::onSliderEvent(ofxDatGuiSliderEvent e) {
    string label = e.target->getLabel();
    if (label == "Viscosity") {
        fluid.viscosity = e.value * 0.0001;
    }
    
    if (label == "Diffusion") {
        fluid.diffusion = e.value * 0.0001;
    }
    
    if (label == "Time step") {
        fluid.lengthOfTimestep = e.value * 0.1;
    }
}

void ofApp::onButtonEvent(ofxDatGuiButtonEvent e) {
    string label = e.target->getLabel();
    if(label == "Reset") {
        fluid.resetFluid();
    }
}

void ofApp::onToggleEvent(ofxDatGuiToggleEvent e) {
    if (e.target->getLabel() == "Noise") {
        fluid.setNoiseDensity(e.target->getChecked());
    }
}


//--------------------------------------------------------------
void ofApp::update(){
    
}

//--------------------------------------------------------------
void ofApp::draw(){
    if (ofGetMousePressed() & (ofGetMouseX() < N*SCALE)) {
        for (int i = 0; i < 5; i++) {
            float amountX = (ofGetMouseX() - ofGetPreviousMouseX())*2;
            float amountY = (ofGetMouseY() - ofGetPreviousMouseY())*2;
            
            int x = ofGetMouseX()/SCALE + int(ofRandom(-2, 3));
            int y = ofGetMouseY()/SCALE + int(ofRandom(-2, 3));
            fluid.addVelocity(x, y, amountX, amountY);
        }
        
        for (int x = ofGetMouseX()-2; x < ofGetMouseX()+2; x++) {
          for (int y = ofGetMouseY()-2; y < ofGetMouseY()+2; y++) {
              fluid.addDensity(x/SCALE, y/SCALE, ofRandom(10, 25));
          }
        }
    }
    
    fluid.step();
    fluid.renderDensity(gui->getToggle("Color Gradient")->getChecked(), gui->getToggle("Flow Field")->getChecked());
    float fadeValue = gui->getSlider("Fade")->getValue();
    if (fadeValue > 0) fluid.fadeDensity(fadeValue);
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
   
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){
    
}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
