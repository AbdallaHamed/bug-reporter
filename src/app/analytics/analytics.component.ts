import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Severity } from '../models/bug';
import { bugs } from '../services/bugs-data';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  @ViewChild('lineChart', { static: true }) lineChartRef: ElementRef;
  @ViewChild('doughnutChart', { static: true }) doughnutChartRef: ElementRef;

  ngOnInit() {
    this.createLineChart();
    this.createDoughnutChart();
  }

  createLineChart(): void {
    const releases = [...new Set(bugs.map(bug => bug.release))];
    const data = releases.map(release => bugs.filter(bug => bug.release === release).length);
    const ctx = this.lineChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: releases,
        datasets: [{
          label: 'Bugs',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Bugs number over releases'
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Releases'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }
    });
  }

  createDoughnutChart(): void {
    const severities = [Severity.Low, Severity.Minor, Severity.Major, Severity.Critical];
    const data = severities.map(severity => bugs.filter(bug => bug.severity === severity).length);
    const ctx = this.doughnutChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: severities,
        datasets: [{
          label: 'Bugs',
          data: data,
          backgroundColor: ["#7FDBFF", "#0074D9", "#FF851B", "#FF4136"]
        }]
      },
      options: {
        legend: {
          display: true,
          position: 'left',
        },
        title: {
          display: true,
          text: 'Bugs Severity'
        },
      }
    });
  }

}
