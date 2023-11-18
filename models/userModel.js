const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    // Common user fields
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    address: String,
    city: String,
    state: String,
    refreshToken: String,
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    role: {
        type: String,
        enum: ['teacher', 'student', 'admin'],
        required: true,
    },
    loginHistory: [
        {
            ipAddress: String,
            loginTime: { type: Date, default: Date.now },
        },
    ],
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resettoken).digest('hex');
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
    return resettoken;
};

const User = mongoose.model('User', userSchema);

const teacherSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // teacher-specific fields
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    address: String,
    city: String,
    state: String,
    image: {
        type: String,
        default: null,
    },
    gender: {
        type: String,
        default: null
    },

    Pincode: {
        type: String,
        default: null
    },
    Certification: {
        type: String,
        default: null
    }, photo_id: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    }, state: {
        type: String,
        default: null
    }, fb_Url: {
        type: String,
        default: null
    }, Twitter_Url: {
        type: String,
        default: null
    }, Instagram_Url: {
        type: String,
        default: null
    }, Pinterest_url: {
        type: String,
        default: null
    }, Linked_In_Url: {
        type: String,
        default: null
    },
    YouTube_Url: {
        type: String,
        default: null
    }, dob: {
        type: String,
        default: null
    }, UserName: {
        type: String,
        default: null
    }, About: {
        type: String,
        default: null
    },
    AcademyName: {
        type: String,
        default: null

    },
    AcademyAddress: {
        type: String,
        default: null
    },
    AcademyImage: {
        type: String,
        default: null
    },
    Services: {
        type: String,
        default: null
    }, Specailization: {
        type: String,
        default: null
    },
   
   
    memberShips: {
        type: String,
        default: null
    }
   
    , BankName: {
        type: String,
        default: null
    }, BranchName: {
        type: String,
        default: null
    }, Account_Number: {
        type: String,
        default: null
    }, AccountName: {
        type: String,
        default: null
    },
    permission: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

const studentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // students-specific fields
    firstname: String,
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    address: String,
    city: String,
    state: String,
    image: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },


    age: {
        type: String,
        default: null
    }
    ,
    permission: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});



const Teacher = mongoose.model('Teacher', teacherSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = { User, Teacher, Student };
