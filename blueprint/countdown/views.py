from . import countdown_bp
from flask import *

@countdown_bp.route("/", methods=["GET","POST"])
def countdown():
    def translation(date):
        from tools.vars import mouths_dict
        if not date in mouths_dict:
                return 'January'
        return mouths_dict[date]
    if request.method == "POST":
        years = request.form.get('years')
        days = request.form.get('days')
        hours = request.form.get('hours')
        minutes = request.form.get('minutes')
        months = translation(request.form.get('months'))
        seconds = request.form.get('seconds')
        date = days + ' ' + months + ' ' + years + ' ' + hours + ':' + minutes + ':' + seconds
        return render_template('countdown/index.html', date=date)
    return render_template('countdown/make.html')

@app.route("/countdown/new_year", methods=["GET","POST"])
def new_year_countdown():
    return render_template("/countdown/new_year.html")