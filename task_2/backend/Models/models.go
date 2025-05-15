package models

import (
	"gorm.io/gorm"
	"github.com/lib/pq"
)

type User struct {
	gorm.Model
	Username   string `json:"username" gorm:"unique;not null"`
	Password   string `json:"password" gorm:"not null"`
	Useremail  string `gorm:"unique;not null" json:"useremail" `
}


type SignupReq struct{
	Username   string `json:"username"`
	Password   string `json:"password"`
	Useremail  string `json:"useremail"`
}


type LoginReq struct{
	Useremail   string `json:"useremail"`
	Password   	string `json:"password"`
}

type InsightPlacement struct{
	gorm.Model
	Username     			string `json:"username"`
	Intro					string `json:"intro"`
	Shortlisted 			pq.StringArray `json:"shortlisted" gorm:"type:text[]"`
	SelectionProcess		pq.StringArray `json:"selectionProcess" gorm:"type:text[]"`
	Insight					pq.StringArray `json:"insight" gorm:"type:text[]"`
	InterviewQuestion		pq.StringArray `json:"interviewQuestion" gorm:"type:text[]"`
	Resources				pq.StringArray `json:"resources" gorm:"type:text[]"`
	Advice					pq.StringArray `json:"advice" gorm:"type:text[]"`
}
type InsightIntern struct{
	gorm.Model
	Username     			string `json:"username"`
	Intro					string `json:"intro"`
	Shortlisted 			pq.StringArray `json:"shortlisted" gorm:"type:text[]"`
	SelectionProcess		pq.StringArray `json:"selectionProcess" gorm:"type:text[]"`
	Resources				pq.StringArray `json:"resources" gorm:"type:text[]"`
	Advice					pq.StringArray `json:"advice" gorm:"type:text[]"`
}
