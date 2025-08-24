import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-enquiry-number',
  imports: [CommonModule],
  templateUrl: './enquiry-number.component.html',
  styleUrl: './enquiry-number.component.scss'
})
export class EnquiryNumberComponent {
  busStandContacts = [
    { id: 1, district: "Ambala", busStand: "Ambala City", contact: "0171-2556388" },
    { id: 1, district: "Ambala", busStand: "Ambala Cantt.", contact: "0171-2640821" },
    { id: 1, district: "Ambala", busStand: "Naraingarh", contact: "01734-284038" },
    { id: 2, district: "Bhiwani", busStand: "Bhiwani", contact: "01664-242230" },
    { id: 3, district: "Charkhi Dadri", busStand: "Charkhi Dadri", contact: "01250-220144" },
    { id: 3, district: "Charkhi Dadri", busStand: "Loharu", contact: "01252-258207" },
    { id: 4, district: "Faridabad", busStand: "Faridabad", contact: "0129-2244953" },
    { id: 5, district: "Fatehabad", busStand: "Fatehabad", contact: "01667-220617" },
    { id: 5, district: "Fatehabad", busStand: "Tohana", contact: "01692-220036" },
    { id: 6, district: "Gurgaon", busStand: "Gurgaon", contact: "0124-2320222, 9306068221" },
    { id: 7, district: "Hisar", busStand: "Hisar", contact: "01662-233285" },
    { id: 7, district: "Hisar", busStand: "Hansi", contact: "01663-254081" },
    { id: 8, district: "Jind", busStand: "Jind", contact: "01681-245370" },
    { id: 8, district: "Jind", busStand: "Narwana", contact: "01684-240104" },
    { id: 8, district: "Jind", busStand: "Safidon", contact: "01686-262235" },
    { id: 9, district: "Jhajjar", busStand: "Jhajjar", contact: "94671-54214" },
    { id: 9, district: "Jhajjar", busStand: "Bahadurgarh", contact: "94671-54209" },
    { id: 9, district: "Jhajjar", busStand: "New Bus Stand", contact: "09467154214" },
    { id: 10, district: "Kaithal", busStand: "Kaithal", contact: "01746-224214" },
    { id: 11, district: "Karnal", busStand: "Karnal Old Bus Stand", contact: "0184-2251158" },
    { id: 12, district: "Kurukshetra", busStand: "Kurukshetra", contact: "01744-220468" },
    { id: 12, district: "Kurukshetra", busStand: "Pehowa", contact: "01741-220102" },
    { id: 13, district: "Mohindergarh", busStand: "Mohindergarh", contact: "01285-222100" },
    { id: 13, district: "Mohindergarh", busStand: "Narnaul", contact: "01282-251947" },
    { id: 14, district: "Panipat", busStand: "Panipat", contact: "0180-2646544" },
    { id: 15, district: "Panchkula", busStand: "Panchkula", contact: "0172-2562200" },
    { id: 15, district: "Panchkula", busStand: "Chandigarh", contact: "0172-2704014" },
    { id: 15, district: "Panchkula", busStand: "Kalka", contact: "01733-225125" },
    { id: 16, district: "Rohtak", busStand: "Rohtak", contact: "01262-276641" },
    { id: 17, district: "Rewari", busStand: "Rewari", contact: "01274-256751" },
    { id: 18, district: "Sonipat", busStand: "Sonipat", contact: "0130-2201101" },
    { id: 18, district: "Sonipat", busStand: "Gohana", contact: "01263-252140" },
    { id: 19, district: "Sirsa", busStand: "Sirsa", contact: "01666-220866" },
    { id: 19, district: "Sirsa", busStand: "Dabwali", contact: "01668-226015" },
    { id: 20, district: "Yamunanagar", busStand: "Yamunanagar", contact: "01732-227717" },
    { id: 21, district: "Mewat (Nuh)", busStand: "Nuh", contact: "01267-274714" },
    { id: 22, district: "Palwal", busStand: "Palwal", contact: "01275-240285" },
    { id: 23, district: "Delhi", busStand: "ISBT-Delhi, Kashmere Gate", contact: "011-42161053" },
    { id: 24, district: "Chandigarh", busStand: "ISBT-17, Chandigarh", contact: "0172-2704014" }
  ];
}
