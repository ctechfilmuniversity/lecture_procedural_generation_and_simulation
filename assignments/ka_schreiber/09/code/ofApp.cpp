#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    ofSetWindowShape(N*SCALE, N*SCALE);
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
    if (ofGetMousePressed()) {
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
    fluid.renderDensity();
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
